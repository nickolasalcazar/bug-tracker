const db = require("../../db/db");
const queries = require("./queries");

module.exports = {
  /**
   * Get a task by ID.
   */
  getTaskById: async (req, res) => {
    try {
      const id = decodeURI(req.params.id);
      const task = await db.query(queries.getTaskById, [id]);
      if (task.rows.length === 0) sendStatus(404);
      const subscribers = await db.query(queries.getSubscribers, [id]);
      res
        .status(200)
        .json({ task: task.rows[0], subscribers: subscribers.rows });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },

  /**
   * Get all tasks that are owned by the user. Does not inlcude tasks that the
   * user is subscribed to.
   */
  getAllOwnedTasks: (req, res) => {
    db.query(queries.getAllOwnedTasks, [req.auth.payload.sub])
      .then((result) => {
        res.status(200).json(result.rows);
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });
  },

  /**
   * Get all tasks that the user is subscribed to.
   */
  getAllSubscribedTasks: (req, res) => {
    db.query(queries.getAllSubscribedTasks, [req.auth.payload.sub])
      .then((result) => {
        res.status(200).json(result.rows);
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
      });
  },

  /**
   * Create a new task.
   */
  createTask: async (req, res) => {
    const ownerId = req.auth.payload.sub;
    let {
      title = null,
      status = null,
      priority = null,
      description = null,
      subscribers = [],
      tags = [],
      project_id = null,
      subtasks: [],
      parent_task_id = null,
      date_created = null,
      date_start = null,
      date_end = null,
    } = req.body;

    const client = await db.getClient();

    try {
      await client.query("BEGIN");
      // Validate inputs
      if (date_created === null) date_created = new Date().toISOString();

      // Insert the new task
      // Note that tags, subtasks, and subscribers
      // need to be inserted in their own queries
      const { rows } = await client.query(queries.createTask, [
        ownerId,
        title,
        status,
        priority,
        description,
        project_id,
        parent_task_id,
        date_created,
        date_start,
        date_end,
      ]);
      console.log("createTask rows", rows);

      // Insert tags, if there are any

      // Insert subtasks, if there are any

      // Insert subscribers
      await client.query(queries.addSubscriber, [rows[0].task_id, ownerId]);

      await client.query("COMMIT");
      res.sendStatus(201);
    } catch (e) {
      await client.query("ROLLBACK");
      res.sendStatus(500);
      throw e;
    } finally {
      client.release();
    }
  },

  deleteTask: (req, res) => {
    console.log("Delete task");
  },

  updateTask: (req, res) => {
    console.log("Update task");
  },
};

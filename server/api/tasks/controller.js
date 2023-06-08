const db = require("../../db/db");
const queries = require("./queries");

module.exports = {
  /**
   * Get a task by ID.
   */
  getTaskById: async (req, res) => {
    try {
      const id = decodeURI(req.params.id);
      const response = await db.query(queries.getTaskById, [id]);
      if (response.rows.length === 0) sendStatus(404);
      const task = response.rows[0];
      res.status(200).json(task);
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
      parent_task_id = null,
      date_created = null,
      date_start = null,
      date_end = null,
    } = req.body;

    try {
      // Validate inputs
      if (date_created === null) date_created = new Date().toISOString();

      // Insert the new task
      const { rows } = await db.query(queries.createTask, [
        ownerId,
        title,
        status,
        priority,
        description,
        project_id,
        parent_task_id,
        date_created,
        (date_modified = date_created),
        date_start,
        date_end,
        tags,
        subscribers,
      ]);
      // const task_id = rows[0].task_id;
      res.sendStatus(201);
    } catch (e) {
      res.sendStatus(500);
      throw e;
    }
  },

  deleteTask: (req, res) => {
    console.log("Delete task");
  },

  updateTask: (req, res) => {
    console.log("Update task");
  },
};

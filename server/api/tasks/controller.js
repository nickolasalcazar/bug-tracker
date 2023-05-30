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
    const {
      title,
      description,
      ownerId = req.auth.payload.sub,
      projectId = null,
      parentTaskId = null,
    } = req.body;

    const client = await db.getClient();

    try {
      await client.query("BEGIN");
      // Create the task
      const { rows } = await client.query(queries.createTask, [
        title,
        description,
        ownerId,
        projectId,
        parentTaskId,
      ]);

      console.log("rows[0].task_id =", rows[0].task_id);

      // Add author as subscriber to task
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

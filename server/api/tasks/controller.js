const db = require("../../db/db");
const queries = require("./queries");

module.exports = {
  /**
   * Get a task by ID.
   */
  getTask: (req, res) => {},

  /**
   * Get all tasks that are owned by the user. Does not inlcude tasks that the
   * user is subscribed to.
   */
  getAllOwnedTasks: (req, res) => {
    if (req.auth.payload.sub !== req.body.sub) res.sendStatus(403);
    else {
      db.query(queries.getAllOwnedTasks, [req.auth.payload.sub])
        .then((result) => {
          res.status(200).json(result.rows);
        })
        .catch((e) => {
          console.log(e);
          res.sendStatus(500);
        });
    }
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

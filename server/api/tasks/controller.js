const db = require("../../db/db");
const queries = require("./queries");

module.exports = {
  /**
   * Get a task by ID.
   */
  getTask: (req, res) => {},

  /**
   * Create a new task.
   */
  createTask: (req, res) => {
    const {
      title,
      description,
      projectId = null,
      parentTaskId = null,
    } = req.body;
    db.query(queries.createTask, [title, description, projectId, parentTaskId])
      .then((result) => {
        console.log(result);
        res.sendStatus(201);
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(403);
      });
  },

  deleteTask: (req, res) => {
    console.log("Delete task");
  },

  updateTask: (req, res) => {
    console.log("Update task");
  },
};

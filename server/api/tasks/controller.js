const db = require("../../db/db");
const queries = require("./queries");

module.exports = {
  /**
   * Get a task by ID.
   * @param {*} req
   * @param {*} res
   */
  getTask: (req, res) => {},

  /**
   * Create a new new task
   * @param {*} req
   * @param {*} res
   */
  createTask: (req, res) => {
    console.log("Create task");
    res.sendStatus(201);
  },

  deleteTask: (req, res) => {
    console.log("Delete task");
  },

  updateTask: (req, res) => {
    console.log("Update task");
  },
};

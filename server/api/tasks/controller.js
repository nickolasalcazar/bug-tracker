const db = require("../../db/db");
const queries = require("./queries");

module.exports = {
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

    // Validate inputs here

    try {
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
      const task_id = rows[0].task_id;
      res.status(201).json({ task_id: task_id });
    } catch (e) {
      res.sendStatus(500);
      throw e;
    }
  },

  updateTask: async (req, res) => {
    const user_id = req.auth.payload.sub;
    // TODO: Is the client an owner or subscriber?
    let {
      task_id,
      title = null,
      status = null,
      priority = null,
      description = null,
      subscribers = [],
      tags = [],
      project_id = null,
      parent_task_id = null,
      date_modified = null,
      date_start = null,
      date_end = null,
    } = req.body;

    // Validate inputs here

    try {
      await db.query(queries.updateTask, [
        task_id,
        title,
        status,
        priority,
        description,
        project_id,
        parent_task_id,
        date_modified,
        date_start,
        date_end,
        tags,
        subscribers,
      ]);
      res.status(201).json({ task_id: task_id });
    } catch (e) {
      res.sendStatus(500);
      throw e;
    }
  },

  deleteTask: (req, res) => {
    const id = decodeURI(req.params.id);
    try {
      const result = db.query(queries.deleteTask, [id]);
      res.status(202).json(result);
    } catch (e) {
      res.sendStatus(400);
    }
  },
};

const db = require("../../db/db");
const queries = require("./queries");

module.exports = {
  getTaskById: async (req, res) => {
    try {
      const task_id = decodeURI(req.params.id);
      const user_id = req.auth.payload.sub;
      const privileges = await getPrivileges(user_id, task_id);
      if (privileges === null) {
        res.sendStatus(500);
        return;
      } else if (!privileges.owner && !privileges.subscriber) {
        res.sendStatus(403);
        return;
      }

      const getTask = await db.query(queries.getTaskById, [task_id]);
      const task = getTask.rows[0];
      const getChildren = await db.query(queries.getChildTasks, [task_id]);
      task.child_tasks = getChildren.rows[0].json_agg;
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
   * Get subscribed and owned tasks.
   */
  // getAllTasks: (req, res) => {
  //   db.query(queries.getAllSubscribedTasks, [req.auth.payload.sub])
  //     .then((result) => {
  //       res.status(200).json(result.rows);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       res.sendStatus(500);
  //     });
  // },

  /**
   * Checks the privileges a user has in relation to a task.
   */
  checkPrivileges: async (req, res) => {
    const user_id = decodeURI(req.auth.payload.sub);
    const task_id = decodeURI(req.params.id);
    const privileges = await getPrivileges(user_id, task_id);
    if (privileges === null) {
      res.sendStatus(500);
    } else {
      res.status(200).json(privileges);
    }
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
    let {
      task_id,
      title = null,
      status = null,
      priority = null,
      description = null,
      subscribers = [],
      tags = [],
      parent_task_id = null,
      date_modified = null,
      date_start = null,
      date_end = null,
    } = req.body;

    // Validate inputs here
    if (parent_task_id === "") parent_task_id = null;

    try {
      await db.query(queries.updateTask, [
        task_id,
        title,
        status,
        priority,
        description,
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

const falsy = { owner: false, subscriber: false };
/**
 * Gets privileges of a task in relation to a user.
 *
 * @param {string} user_id
 * @param {string} task_id
 */
const getPrivileges = async (user_id, task_id) => {
  try {
    if (isNaN(task_id)) return falsy;
    else if (parseInt(task_id) < 0) return falsy;
    const response = await db.query(queries.checkPrivileges, [
      user_id,
      task_id,
    ]);
    if (response.rows.length === 0) return falsy;
    else return response.rows[0];
  } catch (e) {
    console.log("Error in getPrivileges: ", e);
    return null;
  }
};

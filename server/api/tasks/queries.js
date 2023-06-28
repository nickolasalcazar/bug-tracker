module.exports = {
  createTask: `
    INSERT INTO
      tasks(
        owner_id,
        title,
        status,
        priority,
        description,
        project_id,
        parent_task_id,
        date_created,
        date_modified,
        date_start,
        date_end,
        tags,
        subscribers
        )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING task_id`,
  updateTask: `
    UPDATE tasks
    SET
      title = $2,
      status = $3,
      priority = $4,
      description = $5,
      project_id = $6,
      parent_task_id = $7,
      date_modified = $8,
      date_start = $9,
      date_end = $10,
      tags = $11,
      subscribers = $12
    WHERE task_id = $1
    RETURNING task_id`,
  deleteTask: "DELETE FROM tasks WHERE task_id = $1",
  getAllOwnedTasks: `
    SELECT
      tasks.task_id AS "Task ID",
      title AS "Title",
      users.username AS "Creator",
      TO_CHAR(date_created AT TIME ZONE 'UTC', 'MM/DD/YYYY') AS "Created",
      tags AS "Tags",
      subscribers AS "Subscribers"
    FROM tasks
    INNER JOIN users ON users.user_id = $1 
    WHERE $1 = owner_id`,
  getAllSubscribedTasks: `
    SELECT
      tasks.task_id AS "Task ID",
      title AS "Title",
      users.username AS "Creator",
      TO_CHAR(date_created AT TIME ZONE 'UTC', 'MM/DD/YYYY') AS "Created",
      tags AS "Tags",
      subscribers AS "Subscribers"
    FROM tasks
    INNER JOIN users ON users.user_id = $1 
    WHERE users.username = ANY (subscribers)`,
  getAllTasks: ``,
  getTaskById: `
    SELECT
      this.task_id,
      parent.task_id AS parent_task_id,
      parent.title AS parent_title,
      this.project_id,
      this.title,
      this.description,
      users.username AS "creator",
      TO_CHAR(this.date_created AT TIME ZONE 'UTC', 'MM/DD/YYYY HH:MI AM') AS "date_created",
      this.date_start,
      this.date_end,
      this.status,
      this.priority,
      this.tags,
      this.subscribers
    FROM tasks this
    INNER JOIN users ON this.owner_id = users.user_id 
    LEFT JOIN tasks parent ON parent.task_id = this.parent_task_id 
    WHERE this.task_id = $1`,
  checkPrivileges: `
    SELECT (owner_id = $1) AS "owner", (username = ANY (subscribers)) AS "subscriber"
    FROM tasks INNER JOIN users ON users.user_id = $1 WHERE task_id = $2`,
  getChildTasks: `
    SELECT json_agg(json_build_object('task_id', task_id, 'title', title))
    FROM tasks WHERE tasks.parent_task_id = $1`,
};

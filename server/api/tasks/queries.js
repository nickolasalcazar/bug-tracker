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
  getAllOwnedTasks: "SELECT * FROM tasks WHERE owner_id = $1",
  getAllSubscribedTasks: `
    SELECT
      tasks.task_id AS "Task ID",
      title AS "Title",
      users.username AS "Creator",
      TO_CHAR(date_created AT TIME ZONE 'UTC', 'MM/DD/YYYY') AS "Created"
    FROM tasks
    INNER JOIN users ON users.user_id = $1 
    WHERE users.username = ANY (subscribers)`,
  getTaskById: `
    SELECT
      sub.task_id,
      parent.task_id AS parent_task_id,
      parent.title AS parent_title,
      sub.project_id,
      sub.title,
      sub.description,
      users.username AS "creator",
      TO_CHAR(sub.date_created AT TIME ZONE 'UTC', 'MM/DD/YYYY HH:MI AM') AS "date_created",
      sub.date_start,
      sub.date_end,
      sub.status,
      sub.priority,
      sub.tags,
      sub.subscribers
    FROM tasks sub
    INNER JOIN users ON sub.owner_id = users.user_id 
    LEFT JOIN tasks parent ON parent.task_id = sub.parent_task_id 
    WHERE sub.task_id = $1`,
};

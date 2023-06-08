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
        date_start,
        date_end,
        tags,
        subscribers
        )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING task_id`,
  getAllOwnedTasks: "SELECT * FROM tasks WHERE owner_id = $1",
  getAllSubscribedTasks: `
    SELECT
      tasks.task_id AS "Task ID",
      title AS "Title",
      users.username AS "Creator",
      TO_CHAR(date_created AT TIME ZONE 'UTC', 'MM/DD/YYYY') AS "Created"
    FROM tasks
    INNER JOIN users ON tasks.owner_id = $1 
    WHERE users.username = ANY (subscribers)`,
  getTaskById: `
    SELECT
      task_id,
      parent_task_id,
      project_id,
      title,
      description,
      users.username AS "creator",
      TO_CHAR(date_created AT TIME ZONE 'UTC', 'MM/DD/YYYY HH:MI AM') AS "date_created",
      date_start,
      date_end,
      status,
      priority,
      tags,
      subscribers
    FROM tasks
    INNER JOIN users ON tasks.owner_id = users.user_id 
    WHERE tasks.task_id = $1`,
};

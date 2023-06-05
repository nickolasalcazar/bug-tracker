module.exports = {
  createTask: `INSERT INTO
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
        date_end
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING task_id`,
  getAllOwnedTasks: "SELECT * FROM tasks WHERE owner_id = $1",
  // Get all tasks that the user is subcribed to
  getAllSubscribedTasks: `
    SELECT
      tasks.task_id AS "Task ID",
      title AS "Title",
      users.username AS "Creator",
      TO_CHAR(date_created AT TIME ZONE 'UTC', 'MM/DD/YYYY') AS "Created"
      FROM tasks
    INNER JOIN task_subscribers ON tasks.task_id = task_subscribers.task_id
    INNER JOIN users ON tasks.owner_id = users.user_id 
    WHERE task_subscribers.user_id = $1`,
  addSubscriber:
    "INSERT INTO task_subscribers (task_id, user_id) VALUES ($1, $2)",
  getSubscribers: `
    SELECT
      users.user_id,
      users.username
      FROM task_subscribers
    INNER JOIN users ON task_subscribers.user_id = users.user_id
    WHERE task_id = $1`,
  getTaskById: `
    SELECT
      tasks.task_id,
      tasks.parent_task_id,
      tasks.project_id,
      title,
      description,
      users.username AS "creator",
      TO_CHAR(date_created AT TIME ZONE 'UTC', 'MM/DD/YYYY HH:MI AM') AS "date_created",
      date_start,
      date_end,
      status
      FROM tasks
    INNER JOIN task_subscribers ON tasks.task_id = task_subscribers.task_id
    INNER JOIN users ON tasks.owner_id = users.user_id 
    WHERE tasks.task_id = $1`,
};

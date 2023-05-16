module.exports = {
  createTask:
    "INSERT INTO tasks(title, description, owner_id, project_id, parent_task_id) VALUES ($1, $2, $3, $4, $5) RETURNING task_id",
  getAllOwnedTasks: "SELECT * FROM tasks WHERE owner_id = $1",
  // Get all tasks that the user is subcribed to
  getAllSubscribedTasks: `
    SELECT * FROM tasks
    INNER JOIN task_subscribers ON tasks.task_id = task_subscribers.task_id
    WHERE task_subscribers.user_id = $1
    `,
  addSubscriber:
    "INSERT INTO task_subscribers (task_id, user_id) VALUES ($1, $2)",
};

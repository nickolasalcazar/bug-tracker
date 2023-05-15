module.exports = {
  createTask:
    "INSERT INTO tasks(title, description, project_id, parent_task_id) VALUES ($1, $2, $3, $4)",
};

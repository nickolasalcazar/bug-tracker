import { callExternalApi } from "./external-api";
const endpoint = process.env.REACT_APP_API_SERVER_URL;

/**
 * Create a new task.
 *
 * @param {string} accessToken  JWT.
 * @param {object} task         Object containing task data.
 * @example
 *   const response = await createTask(token, {
 *     title,
 *     status,
 *     priority,
 *     description,
 *     subscribers: [id1, id2],
 *     tags: [tag1, tag2],
 *     project_id,
 *     subtasks: [id1, id2]
 *     parent_task_id,
 *     date_created, // ISO 8601
 *     date_start,   // ISO 8601
 *     date_end      // ISO 8601
 *   })
 */
export const createTask = async (accessToken, task) =>
  await callExternalApi({
    url: `${endpoint}/api/tasks/`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: task,
  });

export const updateTask = async (accessToken, task) =>
  await callExternalApi({
    url: `${endpoint}/api/tasks/update`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: task,
  });

export const deleteTask = async (accessToken, task_id) =>
  await callExternalApi({
    url: `${endpoint}/api/tasks/delete/${task_id}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

/**
 * Get all tasks that are owned by the user.
 * @param {string} accessToken  JWT.
 */
export const getOwnedTasks = async (accessToken) =>
  await callExternalApi({
    url: `${endpoint}/api/tasks/owned`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

/**
 * Get all taks that are subscribed to by the user.
 * @param {string} accessToken  JWT.
 */
export const getSubscribedTasks = async (accessToken) =>
  await callExternalApi({
    url: `${endpoint}/api/tasks/subscribed`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

/**
 * Get all of the details of a task.
 * @param {string} accessToken
 * @param {string} taskId
 */
export const getTaskById = async (accessToken, taskId) =>
  await callExternalApi({
    url: `${endpoint}/api/tasks/${taskId}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

/**
 * Get all of the details of a task.
 * @param {string} accessToken
 * @param {string} taskId
 */
export const getPrivileges = async (accessToken, taskId) =>
  await callExternalApi({
    url: `${endpoint}/api/tasks/check/${taskId}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

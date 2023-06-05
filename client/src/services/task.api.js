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

/**
 * Get all subscribed tasks.
 * @param {string} accessToken  JWT.
 */
export const getAllSubscribedTasks = async (accessToken) =>
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

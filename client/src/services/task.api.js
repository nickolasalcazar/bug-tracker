import { callExternalApi } from "./external-api";
const endpoint = process.env.REACT_APP_API_SERVER_URL;

/**
 * Create a new task.
 * @param {string} accessToken  JWT.
 * @param {object} task         Object containing task data.
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

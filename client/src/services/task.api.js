import { callExternalApi } from "./external-api";
const endpoint = process.env.REACT_APP_API_SERVER_URL;

/**
 * Create a new user.
 * @param {string} accessToken  JWT.
 * @param {object} user         Object containing user info.
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

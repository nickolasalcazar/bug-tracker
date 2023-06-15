import { callExternalApi } from "./external-api";
const endpoint = process.env.REACT_APP_API_SERVER_URL;

/**
 * Fetches profile info of the logged in user.
 * @param {string} accessToken  JWT.
 * @param {string} id           User ID or sub.
 */
export const getUserInfo = async (accessToken, id) =>
  await callExternalApi({
    url: `${endpoint}/api/user/id/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

/**
 * Fetches profile info of a particular user given a username, in addition
 * to the connection (i.e. 'friend') status in relation to the logged in user.
 */
export const getUserByUsername = async (accessToken, username) =>
  await callExternalApi({
    url: `${endpoint}/api/user/username/${username}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

/**
 * Create a new user.
 * @param {string} accessToken  JWT.
 * @param {object} user         Object containing user info.
 */
export const createUser = async (accessToken, user) =>
  await callExternalApi({
    url: `${endpoint}/api/user/`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      sub: user.sub,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      picture: user.picture,
    },
  });

export const getConnections = async (accessToken) =>
  await callExternalApi({
    url: `${endpoint}/api/user/connections`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const addConnection = async (accessToken, user_id) =>
  await callExternalApi({
    url: `${endpoint}/api/user/connections/add/${user_id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const acceptConnection = async (accessToken, user_id) =>
  await callExternalApi({
    url: `${endpoint}/api/user/connections/accept/${user_id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const removeConnection = async (accessToken, user_id) =>
  await callExternalApi({
    url: `${endpoint}/api/user/connections/remove/${user_id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

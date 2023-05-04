// All interactions with API takes place here
import { callExternalApi } from "./external-api";

const endpoint = process.env.REACT_APP_API_SERVER_URL;

/**
 * Fetches profile info of user.
 * @param {string} accessToken  JWT.
 * @param {string} id           User ID or sub.
 */
export const getUserInfo = async (accessToken, id) =>
  await callExternalApi({
    url: `${endpoint}/api/user/${id}`,
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

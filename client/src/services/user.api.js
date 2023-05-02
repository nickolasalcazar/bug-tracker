// All interactions with API takes place here
import { callExternalApi } from "./external-api";

const endpoint = process.env.REACT_APP_API_SERVER_URL;

/**
 * Fetches user's info from their ID.
 * @param {string} accessToken  JWT
 * @param {string} id           User ID or sub
 */
export const getUserInfo = async (accessToken, id) => {
  const { data, error } = await callExternalApi({
    url: `${endpoint}/api/user/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    data: data || null,
    error,
  };
};

/**
 * Create a new user.
 * @param {string} accessToken JWT
 */
export const createUser = async (accessToken) => {};

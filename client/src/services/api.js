// All interactions with API takes place here
import { callExternalApi } from "./external-api";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

/**
 * Fetches a protected resource that requires an access token.
 * @param {string} accessToken
 */
export const getTasks = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/getTasks`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi(config);

  return {
    data: data || null,
    error,
  };
};

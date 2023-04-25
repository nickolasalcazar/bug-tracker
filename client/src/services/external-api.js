import axios from "axios";

/**
 * Call external API at a URL specified in config parameter.
 *
 * @param {any} config
 * @example
 * const config = {
 *  url: `${apiServerUrl}/api/messages/protected`,
 *  method: "GET",
 *  headers: {
 *    "content-type": "application/json",
 *    Authorization: `Bearer ${accessToken}`,
 *  }
 * const { data, error } = await callExternalApi(config);
 */
export const callExternalApi = async (config) => {
  return await axios
    .get(config.url, { headers: config.headers })
    .then((response) => {
      console.log("callExternalApi():", response.data);
      return { data: response.data, error: undefined };
    })
    .catch((e) => {
      console.log("callExternalApi():", e);
      return { data: null, error: e };
    });
};

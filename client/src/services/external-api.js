import axios from "axios";
/**
 * Call external API at a URL specified in config parameter.
 *
 * @example
 * const config = {
 *   url: `${apiServerUrl}/api/user/`,
 *   method: "POST",
 *   headers: {
 *     "content-type": "application/json",
 *     Authorization: `Bearer ${accessToken}`,
 *   }
 *   data: {
 *     key1: "value1",
 *   }
 * const { data, error } = await callExternalApi(config);
 */
export const callExternalApi = async ({ url, method, headers, data }) => {
  return await axios({ url, method, headers: headers, data })
    .then((res) => res)
    .catch((e) => e.response);
};

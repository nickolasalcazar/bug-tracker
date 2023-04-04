import axios from "axios";

export const callExternalApi = async (config) => {
  return await axios
    // .get(config.url, config.method, config.headers)
    .get(config.url, { headers: config.headers })
    .then((response) => {
      console.log("response =", response.data);
      return { data: response.data, error: undefined };
    })
    .catch((e) => {
      console.log("Error =", e);
      return { data: null, error: e };
    });
};

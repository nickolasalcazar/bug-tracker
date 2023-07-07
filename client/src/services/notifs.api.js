import { callExternalApi } from "./external-api";
import config from "../config";
const endpoint = config.API_SERVER_URL;

export const getNotifs = async (accessToken) =>
  await callExternalApi({
    url: `${endpoint}/api/notifs`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

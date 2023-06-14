import { callExternalApi } from "./external-api";
const endpoint = process.env.REACT_APP_API_SERVER_URL;

export const getNotifs = async (accessToken) =>
  await callExternalApi({
    url: `${endpoint}/api/notifs`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

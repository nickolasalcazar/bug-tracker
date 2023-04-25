const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { auth } = require("express-oauth2-jwt-bearer");

dotenv.config();

const PORT = parseInt(process.env.PORT, 10);
// const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

const jwtCheck = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
  tokenSigningAlg: "RS256",
});

app.use(cors());

app.get("/api/messages/public", (req, res) => {
  res.send("public resource");
});

app.get("/api/messages/protected", jwtCheck, async (req, res) => {
  console.log("Accessed /api/messages/protected");

  // Get the data of the logged in user who made the call
  const payload = req.auth.payload;
  console.log("req.auth.payload =", payload);

  res.send("Hello, " + payload.name + " this is the backend!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

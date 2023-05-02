/**
 * This module is for testing endpoints that require authentication.
 */
const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const messagesRouter = Router();

messagesRouter.get("/public", (req, res) => {
  res.send("public resource");
});

messagesRouter.get("/protected", jwtCheck, async (req, res) => {
  console.log("Accessed /api/messages/protected");

  // Get the data of the logged in user who made the call
  const payload = req.auth.payload;
  console.log("req.auth.payload =", payload);

  res.send("Hello, " + payload.name + " this is the backend!");
});

module.exports = messagesRouter;

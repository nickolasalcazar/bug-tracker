const express = require("express");

const apiRouter = express.Router();

const { messagesRouter } = require("./messages/messages.router");

apiRouter.use("/messages", messagesRouter);

module.exports = { apiRouter };

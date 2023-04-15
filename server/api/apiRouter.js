const express = require("express");

const apiRouter = express.Router();

const { messagesRouter } = require("./messages/messages.router");
const { userRouter } = require("./user/user.router");

apiRouter.use("/messages", messagesRouter);
apiRouter.use("/user", userRouter);

module.exports = { apiRouter };

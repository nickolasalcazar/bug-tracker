const express = require("express");
const apiRouter = express.Router();

const userRouter = require("./user/userRouter");
const messagesRouter = require("./messages/messagesRouter");

apiRouter.use("/user", userRouter);
apiRouter.use("/messages", messagesRouter);

module.exports = apiRouter;

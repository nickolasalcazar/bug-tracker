const express = require("express");
const apiRouter = express.Router();

const userRouter = require("./user/userRouter");
const tasksRouter = require("./tasks/router");
const messagesRouter = require("./messages/messagesRouter");

apiRouter.use("/user", userRouter);
apiRouter.use("/tasks", tasksRouter);
apiRouter.use("/notifs", notifsRouter);
apiRouter.use("/messages", messagesRouter);

module.exports = apiRouter;

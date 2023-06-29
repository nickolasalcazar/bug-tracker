const express = require("express");
const apiRouter = express.Router();

const userRouter = require("./user/userRouter");
const tasksRouter = require("./tasks/router");
const notifsRouter = require("./notifs/router");

apiRouter.use("/user", userRouter);
apiRouter.use("/tasks", tasksRouter);
apiRouter.use("/notifs", notifsRouter);

module.exports = apiRouter;

const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const tasksRouter = Router();

const controller = require("./controller");

tasksRouter.use(jwtCheck);
tasksRouter.get("/subscribed", controller.getAllSubscribedTasks);
tasksRouter.get("/:id", controller.getTaskById);
tasksRouter.post("/", controller.createTask);
tasksRouter.post("/update", controller.updateTask);

module.exports = tasksRouter;

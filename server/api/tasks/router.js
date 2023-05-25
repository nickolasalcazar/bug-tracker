const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const tasksRouter = Router();

const controller = require("./controller");

tasksRouter.use(jwtCheck);
tasksRouter.get("/:id", controller.getTaskById);
// tasksRouter.get("/", controller.getAllOwnedTasks);
tasksRouter.get("/subscribed", controller.getAllSubscribedTasks);
tasksRouter.post("/", controller.createTask);

module.exports = tasksRouter;

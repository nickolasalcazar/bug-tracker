const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const tasksRouter = Router();

const controller = require("./controller");

tasksRouter.use(jwtCheck);
// tasksRouter.get("/:id", controller.gettaskById);
tasksRouter.get("/", controller.getAllOwnedTasks); // Does not returned subscribed tasks
tasksRouter.post("/", controller.createTask);

module.exports = tasksRouter;

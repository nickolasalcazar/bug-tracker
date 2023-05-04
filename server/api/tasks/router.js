const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const tasksRouter = Router();

const controller = require("./controller");

tasksRouter.use(jwtCheck);
// tasksRouter.get("/:id", controller.getUser);
tasksRouter.post("/", controller.createTask);

module.exports = tasksRouter;

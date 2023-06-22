const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const tasksRouter = Router();

const controller = require("./controller");

tasksRouter.use(jwtCheck);
tasksRouter.get("/subscribed", controller.getAllSubscribedTasks);
tasksRouter.get("/owned", controller.getAllOwnedTasks);
// tasksRouter.get("/all", controller.getAllTasks); // Unimplemented
tasksRouter.get("/:id", controller.getTaskById);
tasksRouter.post("/", controller.createTask);
tasksRouter.post("/update", controller.updateTask);
tasksRouter.post("/delete/:id", controller.deleteTask);

tasksRouter.get("/check/:id", controller.checkPrivileges);

module.exports = tasksRouter;

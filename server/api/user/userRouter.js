const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const userRouter = Router();

const controller = require("./controller");

userRouter.use(jwtCheck);

// Connections
userRouter.get("/connections/add/:id", controller.addConnection);
userRouter.get("/connections/remove/:id", controller.removeConnection);
userRouter.get("/connections/accept/:id", controller.acceptConnection);
userRouter.get("/connections", controller.getConnections);

userRouter.get("/id/:id", controller.getUserById);
userRouter.get("/username/:username", controller.getUserByUsername);
userRouter.post("/", controller.createUser);
// userRouter.delete("/:id", controller.deleteUser);
// userRouter.put("/:id", controller.updateUser);

module.exports = userRouter;

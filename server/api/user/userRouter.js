const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const userRouter = Router();

const controller = require("./controller");

userRouter.use(jwtCheck);
userRouter.get("/:id", controller.getUser);
userRouter.post("/", controller.createUser);
// userRouter.delete("/:id", controller.deleteUser);
// userRouter.put("/:id", controller.updateUser);

module.exports = userRouter;

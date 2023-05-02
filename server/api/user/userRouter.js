const { Router } = require("express");
const userRouter = Router();

const controller = require("./controller");

// userRouter.post("/", controller.addUser);
userRouter.get("/:id", controller.getUser);
// userRouter.delete("/:id", controller.deleteUser);
// userRouter.put("/:id", controller.updateUser);

module.exports = userRouter;

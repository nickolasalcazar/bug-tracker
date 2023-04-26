const express = require("express");
const apiRouter = express.Router();

const userRouter = require("./user/userRouter");
apiRouter.use("/user", userRouter);

// const projectRouter = require("./project/projectRouter");
// apiRouter.use("/project", projectRouter);

module.exports = { apiRouter };

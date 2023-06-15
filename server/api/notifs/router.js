const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const notifsRouter = Router();

const controller = require("./controller");

notifsRouter.use(jwtCheck);
notifsRouter.get("/", controller.getNotifs);

module.exports = notifsRouter;

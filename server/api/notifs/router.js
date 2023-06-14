const { Router } = require("express");
const jwtCheck = require("../../utils/jwtCheck");
const notifsRouter = Router();

const controller = require("./controller");

notifsRouter.use(jwtCheck);
// notifsRouter.get("/", controller.getTasks);
notifsRouter.get("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = notifsRouter;

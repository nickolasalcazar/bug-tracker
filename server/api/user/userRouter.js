const { Router } = require("express");
const userRouter = Router();

const controller = require("./controller");

router.get("/", controller.getStudents);
router.post("/", controller.addStudent);

router.get("/:id", controller.getStudentById);
router.delete("/:id", controller.deleteStudent);
router.put("/:id", controller.updateStudent);

module.exports = userRouter;

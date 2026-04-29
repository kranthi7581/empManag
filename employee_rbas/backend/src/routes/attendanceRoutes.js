const express = require("express");
const controller = require("../controllers/attendanceController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", controller.createAttendance);
router.get("/", controller.getAttendances);
router.get("/:id", controller.getAttendanceById);
router.put("/:id", controller.updateAttendance);
router.delete("/:id", controller.deleteAttendance);

module.exports = router;

const express = require("express");
const controller = require("../controllers/leaveController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/", controller.createLeave);
router.get("/", controller.getLeaves);
router.put("/:id", controller.updateLeave);

module.exports = router;

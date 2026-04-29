const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getProfile);
router.put("/change-password", authMiddleware, authController.changePassword);

module.exports = router;

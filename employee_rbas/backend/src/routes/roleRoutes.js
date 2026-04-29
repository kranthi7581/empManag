const express = require("express");
const controller = require("../controllers/roleController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", controller.createRole);
router.get("/", controller.getRoles);
router.get("/:id", controller.getRoleById);
router.put("/:id", controller.updateRole);
router.delete("/:id", controller.deleteRole);

module.exports = router;

const express = require("express");
const controller = require("../controllers/rolePermissionController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", controller.createRolePermission);
router.get("/", controller.getRolePermissions);
router.get("/:id", controller.getRolePermissionById);
router.put("/:id", controller.updateRolePermission);
router.delete("/:id", controller.deleteRolePermission);

module.exports = router;

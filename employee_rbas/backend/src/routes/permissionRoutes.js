const express = require("express");
const controller = require("../controllers/permissionController");
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", controller.createPermission);
router.get("/", controller.getPermissions);
router.get("/:id", controller.getPermissionById);
router.put("/:id", controller.updatePermission);
router.delete("/:id", controller.deletePermission);

module.exports = router;

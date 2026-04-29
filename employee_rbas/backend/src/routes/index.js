const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const roleRoutes = require("./roleRoutes");
const permissionRoutes = require("./permissionRoutes");
const companyRoutes = require("./companyRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const rolePermissionRoutes = require("./rolePermissionRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/companies", companyRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/role-permissions", rolePermissionRoutes);

module.exports = router;

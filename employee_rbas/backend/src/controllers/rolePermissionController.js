const RolePermission = require("../models/RolePermission");
const asyncHandler = require("../utils/asyncHandler");

const populateRolePermission = (query) =>
  query.populate("role").populate("permission");

exports.createRolePermission = asyncHandler(async (req, res) => {
  const rolePermission = await RolePermission.create(req.body);
  const populatedRolePermission = await populateRolePermission(
    RolePermission.findById(rolePermission._id),
  );

  return res.status(201).json({
    message: "Role permission mapping created successfully",
    rolePermission: populatedRolePermission,
  });
});

exports.getRolePermissions = asyncHandler(async (req, res) => {
  const filters = {};

  if (req.query.role) {
    filters.role = req.query.role;
  }

  if (req.query.permission) {
    filters.permission = req.query.permission;
  }

  const rolePermissions = await populateRolePermission(RolePermission.find(filters));

  return res.status(200).json({
    count: rolePermissions.length,
    rolePermissions,
  });
});

exports.getRolePermissionById = asyncHandler(async (req, res) => {
  const rolePermission = await populateRolePermission(RolePermission.findById(req.params.id));

  if (!rolePermission) {
    return res.status(404).json({ message: "Role permission mapping not found" });
  }

  return res.status(200).json({ rolePermission });
});

exports.updateRolePermission = asyncHandler(async (req, res) => {
  const rolePermission = await RolePermission.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("role")
    .populate("permission");

  if (!rolePermission) {
    return res.status(404).json({ message: "Role permission mapping not found" });
  }

  return res.status(200).json({
    message: "Role permission mapping updated successfully",
    rolePermission,
  });
});

exports.deleteRolePermission = asyncHandler(async (req, res) => {
  const rolePermission = await RolePermission.findByIdAndDelete(req.params.id);

  if (!rolePermission) {
    return res.status(404).json({ message: "Role permission mapping not found" });
  }

  return res.status(200).json({
    message: "Role permission mapping deleted successfully",
  });
});

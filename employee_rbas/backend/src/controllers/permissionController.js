const Permission = require("../models/Permission");
const asyncHandler = require("../utils/asyncHandler");

exports.createPermission = asyncHandler(async (req, res) => {
  const permission = await Permission.create(req.body);
  return res.status(201).json({
    message: "Permission created successfully",
    permission,
  });
});

exports.getPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permission.find().sort({ name: 1 });
  return res.status(200).json({ count: permissions.length, permissions });
});

exports.getPermissionById = asyncHandler(async (req, res) => {
  const permission = await Permission.findById(req.params.id);

  if (!permission) {
    return res.status(404).json({ message: "Permission not found" });
  }

  return res.status(200).json({ permission });
});

exports.updatePermission = asyncHandler(async (req, res) => {
  const permission = await Permission.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!permission) {
    return res.status(404).json({ message: "Permission not found" });
  }

  return res.status(200).json({
    message: "Permission updated successfully",
    permission,
  });
});

exports.deletePermission = asyncHandler(async (req, res) => {
  const permission = await Permission.findByIdAndDelete(req.params.id);

  if (!permission) {
    return res.status(404).json({ message: "Permission not found" });
  }

  return res.status(200).json({ message: "Permission deleted successfully" });
});

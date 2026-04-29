const Role = require("../models/Role");
const asyncHandler = require("../utils/asyncHandler");

exports.createRole = asyncHandler(async (req, res) => {
  const role = await Role.create(req.body);
  return res.status(201).json({ message: "Role created successfully", role });
});

exports.getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find().sort({ createdAt: -1 });
  return res.status(200).json({ count: roles.length, roles });
});

exports.getRoleById = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  return res.status(200).json({ role });
});

exports.updateRole = asyncHandler(async (req, res) => {
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  return res.status(200).json({ message: "Role updated successfully", role });
});

exports.deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findByIdAndDelete(req.params.id);

  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  return res.status(200).json({ message: "Role deleted successfully" });
});

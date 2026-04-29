const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const userPopulation = [{ path: "role" }, { path: "company" }];

const applyPopulate = (query) =>
  userPopulation.reduce(
    (currentQuery, item) => currentQuery.populate(item),
    query,
  );

const sanitizeUser = (user) => {
  const userObject = user.toObject ? user.toObject() : { ...user };
  delete userObject.password;
  return userObject;
};

const buildScope = (req) => {
  if (req.user?.isSuperAdmin) {
    return {};
  }

  return req.user?.companyId
    ? { company: req.user.companyId }
    : { _id: req.user.userId };
};

exports.createUser = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (!payload.email && payload.workEmail) {
    payload.email = payload.workEmail;
  }

  if (!payload.password && payload.temporaryPassword) {
    payload.password = payload.temporaryPassword;
  }

  if (!payload.name && payload.firstName) {
    payload.name = `${payload.firstName} ${payload.lastName || ""}`.trim();
  }

  if (!payload.name || !payload.email || !payload.password) {
    return res.status(400).json({
      message: "Name, email, and password are required",
    });
  }

  if (!req.user?.isSuperAdmin && req.user?.companyId) {
    payload.company = req.user.companyId;
    payload.isSuperAdmin = false;
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  const user = await User.create(payload);
  const populatedUser = await applyPopulate(User.findById(user._id));

  return res.status(201).json({
    message: "User created successfully",
    user: sanitizeUser(populatedUser),
  });
});

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await applyPopulate(
    User.find(buildScope(req)).select("-password"),
  ).sort({
    createdAt: -1,
  });

  return res.status(200).json({ count: users.length, users });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await applyPopulate(
    User.findOne({
      _id: req.params.id,
      ...buildScope(req),
    }).select("-password"),
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  if (!req.user?.isSuperAdmin) {
    delete payload.isSuperAdmin;

    if (req.user?.companyId) {
      payload.company = req.user.companyId;
    }
  }

  const user = await User.findOneAndUpdate(
    {
      _id: req.params.id,
      ...buildScope(req),
    },
    payload,
    { new: true, runValidators: true },
  )
    .select("-password")
    .populate("role")
    .populate("company");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    message: "User updated successfully",
    user,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOneAndDelete({
    _id: req.params.id,
    ...buildScope(req),
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User deleted successfully" });
});

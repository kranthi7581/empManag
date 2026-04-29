const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const asyncHandler = require("../utils/asyncHandler");

const sanitizeUser = (user) => {
  const userObject = user.toObject ? user.toObject() : { ...user };
  delete userObject.password;
  return userObject;
};

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role, company } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    company,
    isSuperAdmin: false,
  });

  const populatedUser = await User.findById(user._id)
    .populate("role")
    .populate("company");

  const token = generateToken(user);

  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: sanitizeUser(populatedUser),
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email })
    .populate("role")
    .populate("company");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Sync systemRole with populated role name if necessary
  if (user.role?.name?.toLowerCase() === "admin" && user.systemRole !== "admin") {
    user.systemRole = "admin";
    await user.save();
  } else if (
    user.role?.name?.toLowerCase() === "employee" &&
    user.systemRole !== "employee"
  ) {
    user.systemRole = "employee";
    await user.save();
  }

  const token = generateToken(user);

  return res.status(200).json({
    message: "Login successful",
    token,
    user: sanitizeUser(user),
  });
});

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId)
    .select("-password")
    .populate("role")
    .populate("company");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Current and new passwords are required" });
  }

  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return res.status(200).json({ message: "Password updated successfully" });
});

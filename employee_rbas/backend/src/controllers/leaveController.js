const Leave = require("../models/Leave");
const asyncHandler = require("../utils/asyncHandler");

const leavePopulation = [
  { path: "user", select: "name email systemRole" },
  { path: "company", select: "name" },
  { path: "approvedBy", select: "name email" },
];

const applyPopulate = (query) =>
  leavePopulation.reduce(
    (currentQuery, item) => currentQuery.populate(item),
    query,
  );

const isAdminUser = (req) => {
  if (req.user?.isSuperAdmin) return true;
  if (req.user?.systemRole === "admin") return true;
  
  // If the systemRole is still "employee" (default) but the role object name is "Admin"
  // Note: Since we rely on JWT, we might not have the populated role name here 
  // unless we query the DB. For now, let's stick to the token fields.
  return false;
};

const buildScope = (req) => {
  if (isAdminUser(req)) {
    return {};
  }

  return req.user?.companyId
    ? { company: req.user.companyId, user: req.user.userId }
    : { user: req.user.userId };
};

exports.createLeave = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (!isAdminUser(req)) {
    payload.user = req.user.userId;
    payload.company = req.user.companyId;
    payload.status = "pending"; // Ensure employees can't set their own status
  }

  const leave = await Leave.create(payload);
  const populatedLeave = await applyPopulate(Leave.findById(leave._id));

  return res.status(201).json({
    message: "Leave request submitted successfully",
    leave: populatedLeave,
  });
});

exports.getLeaves = asyncHandler(async (req, res) => {
  const query = { ...buildScope(req) };

  if (req.query.user && isAdminUser(req)) {
    query.user = req.query.user;
  }

  const leaves = await applyPopulate(Leave.find(query)).sort({ createdAt: -1 });

  return res.status(200).json({ count: leaves.length, leaves });
});

exports.updateLeave = asyncHandler(async (req, res) => {
  if (!isAdminUser(req)) {
    return res
      .status(403)
      .json({ message: "Only admin users can update leave approval status." });
  }

  const { status } = req.body;
  
  if (!["pending", "approved", "declined"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const payload = { status };
  
  // Track who performed the action
  if (status === "approved" || status === "declined") {
    payload.approvedBy = req.user.userId;
  }

  const leave = await Leave.findOneAndUpdate({ _id: req.params.id }, payload, {
    new: true,
    runValidators: true,
  });

  if (!leave) {
    return res.status(404).json({ message: "Leave request not found" });
  }

  const populatedLeave = await applyPopulate(Leave.findById(leave._id));

  return res.status(200).json({
    message: `Leave request ${status} successfully`,
    leave: populatedLeave,
  });
});

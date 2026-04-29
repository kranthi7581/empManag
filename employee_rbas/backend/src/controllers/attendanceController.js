const Attendance = require("../models/Attendance");
const asyncHandler = require("../utils/asyncHandler");

const attendancePopulation = [
  { path: "user", select: "name email" },
  { path: "company", select: "name" },
];

const applyPopulate = (query) =>
  attendancePopulation.reduce(
    (currentQuery, item) => currentQuery.populate(item),
    query,
  );

const buildScope = (req) => {
  if (req.user?.isSuperAdmin) {
    return {};
  }

  return req.user?.companyId
    ? { company: req.user.companyId }
    : { user: req.user.userId };
};

const calculateWorkingHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) {
    return undefined;
  }

  const diffInMilliseconds = new Date(checkOut) - new Date(checkIn);

  if (Number.isNaN(diffInMilliseconds) || diffInMilliseconds < 0) {
    return undefined;
  }

  return Number((diffInMilliseconds / (1000 * 60 * 60)).toFixed(2));
};

exports.createAttendance = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (!req.user?.isSuperAdmin) {
    payload.company = req.user.companyId || payload.company;
    payload.user = payload.user || req.user.userId;
  }

  payload.date = payload.date || payload.checkIn || new Date();

  const workingHours = calculateWorkingHours(payload.checkIn, payload.checkOut);
  if (workingHours !== undefined) {
    payload.workingHours = workingHours;
  }

  const attendance = await Attendance.create(payload);
  const populatedAttendance = await applyPopulate(
    Attendance.findById(attendance._id),
  );

  return res.status(201).json({
    message: "Attendance created successfully",
    attendance: populatedAttendance,
  });
});

exports.getAttendances = asyncHandler(async (req, res) => {
  const query = { ...buildScope(req) };

  if (req.query.user) {
    query.user = req.query.user;
  }

  if (req.query.company && req.user?.isSuperAdmin) {
    query.company = req.query.company;
  }

  const attendances = await applyPopulate(Attendance.find(query)).sort({
    date: -1,
    createdAt: -1,
  });

  return res.status(200).json({ count: attendances.length, attendances });
});

exports.getAttendanceById = asyncHandler(async (req, res) => {
  const attendance = await applyPopulate(
    Attendance.findOne({
      _id: req.params.id,
      ...buildScope(req),
    }),
  );

  if (!attendance) {
    return res.status(404).json({ message: "Attendance record not found" });
  }

  return res.status(200).json({ attendance });
});

exports.updateAttendance = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  const workingHours = calculateWorkingHours(payload.checkIn, payload.checkOut);

  if (workingHours !== undefined) {
    payload.workingHours = workingHours;
  }

  if (!req.user?.isSuperAdmin && req.user?.companyId) {
    payload.company = req.user.companyId;
  }

  const attendance = await Attendance.findOneAndUpdate(
    {
      _id: req.params.id,
      ...buildScope(req),
    },
    payload,
    { new: true, runValidators: true },
  )
    .populate("user", "name email")
    .populate("company", "name");

  if (!attendance) {
    return res.status(404).json({ message: "Attendance record not found" });
  }

  return res.status(200).json({
    message: "Attendance updated successfully",
    attendance,
  });
});

exports.deleteAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findOneAndDelete({
    _id: req.params.id,
    ...buildScope(req),
  });

  if (!attendance) {
    return res.status(404).json({ message: "Attendance record not found" });
  }

  return res.status(200).json({ message: "Attendance deleted successfully" });
});

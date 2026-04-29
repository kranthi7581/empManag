const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

    date: Date,
    checkIn: Date,
    checkOut: Date,

    status: String,
    workingHours: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Attendance", attendanceSchema);

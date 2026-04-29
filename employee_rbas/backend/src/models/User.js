const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    phoneNumber: String,
    joinDate: Date,
    bio: String,
    department: String,
    position: String,
    basicSalary: Number,
    allowances: Number,
    deductions: Number,
    systemRole: {
      type: String,
      enum: ["employee", "manager", "admin"],
      default: "employee",
    },

    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

    isSuperAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);

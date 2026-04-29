const mongoose = require("mongoose");

const rolePermissionSchema = new mongoose.Schema({
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  permission: { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
});

module.exports = mongoose.model("RolePermission", rolePermissionSchema);

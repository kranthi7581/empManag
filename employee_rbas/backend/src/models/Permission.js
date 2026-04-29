const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Permission", permissionSchema);

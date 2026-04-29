const RolePermission = require("../models/RolePermission");
const Role = require("../models/Role");

module.exports = (permissionName) => {
  return async (req, res, next) => {
    if (req.user?.isSuperAdmin) {
      return next();
    }

    const role = await Role.findById(req.user.role);

    if (!role) {
      return res.status(403).json({ message: "Role not found" });
    }

    const permissions = await RolePermission.find({ role: role._id })
      .populate("permission");

    const hasPermission = permissions.some(p =>
      p.permission.name === permissionName
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      companyId: user.company,
      systemRole: user.systemRole,
      isSuperAdmin: user.isSuperAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const permissionRoutes = require("./src/routes/permissionRoutes");
const companyRoutes = require("./src/routes/companyRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");
const leaveRoutes = require("./src/routes/leaveRoutes");
const rolePermissionRoutes = require("./src/routes/rolePermissionRoutes");
const errorHandler = require("./src/middlewares/errorHandler");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Employee RBAC backend is running" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/role-permissions", rolePermissionRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import LoginLanding from "./Pages/LoginLanding";
import Layout from "./Pages/Layout";
import Dashbord from "./Pages/Dashbord";
import Attendance from "./Pages/Attendance";
import Employees from "./Pages/Employees";
import Leave from "./Pages/Leave";
import Payslips from "./Pages/Payslips";
import Settings from "./Pages/Settings";
import PrintPayslip from "./Pages/PrintPayslip";
import { Navigate } from "react-router-dom";
import LoginForm from "./Components/LoginForm";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginLanding />} />

        <Route path="/login/admin" element={<LoginForm role="ADMIN" title="Admin portal"  subtitle="sign in to manage the organization" />} />
        <Route path="/login/employee" element={<LoginForm role="EMPLOYEE" title="Employee portal" subtitle="sign in to access your profile and records" />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashbord />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/print-payslip/:id" element={<PrintPayslip />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;

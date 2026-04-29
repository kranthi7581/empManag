import { useState } from "react";
import { DashboardShell } from "../components/DashboardShell";
import { useAuth } from "../hooks/useAuth";
import { EmployeeOverviewSection } from "./employee/EmployeeOverviewSection";
import { EmployeeAttendanceSection } from "./employee/EmployeeAttendanceSection";
import { EmployeeLeaveSection } from "./employee/EmployeeLeaveSection";
import { EmployeePayslipsSection } from "./employee/EmployeePayslipsSection";
import { EmployeeSettingsSection } from "./employee/EmployeeSettingsSection";

const employeeNav = [
  { key: "dashboard", label: "Dashboard", icon: "DB" },
  { key: "attendance", label: "Attendance", icon: "AT" },
  { key: "leave", label: "Leave", icon: "LV" },
  { key: "payslips", label: "Payslips", icon: "PY" },
  { key: "settings", label: "Settings", icon: "ST" },
];

export const EmployeeDashboardPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { session } = useAuth();

  const userName = session?.user?.name || "Employee";
  const userRoleLabel =
    session?.user?.role === "employee" ? "Employee" : "Employee";
  const userInitial = userName.charAt(0).toUpperCase();

  const navItems = employeeNav.map((item) => ({
    ...item,
    active: item.key === activeSection,
  }));

  const sections = {
    dashboard: {
      title: `Welcome, ${userName}!`,
      subtitle: session?.user?.designation || "Employee Dashboard",
      content: <EmployeeOverviewSection onNavigate={setActiveSection} />,
    },
    attendance: {
      title: "Attendance",
      subtitle: "Track your work hours and daily check-ins",
      content: <EmployeeAttendanceSection />,
    },
    leave: {
      title: "Leave Management",
      subtitle: "Your leave history and requests",
      content: <EmployeeLeaveSection />,
    },
    payslips: {
      title: "Payslips",
      subtitle: "Your payslip history",
      content: <EmployeePayslipsSection />,
    },
    settings: {
      title: "Settings",
      subtitle: "Manage your account and preferences",
      content: <EmployeeSettingsSection />,
    },
  };

  const activeView = sections[activeSection];

  return (
    <DashboardShell
      title={activeView.title}
      subtitle={activeView.subtitle}
      navItems={navItems}
      onSelectNav={setActiveSection}
      profile={{
        name: userName,
        roleLabel: userRoleLabel,
        initial: userInitial,
      }}
    >
      {activeView.content}
    </DashboardShell>
  );
};

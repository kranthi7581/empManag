import { useState } from "react";
import { DashboardShell } from "../components/DashboardShell";
import { AdminOverviewSection } from "./admin/AdminOverviewSection";
import { AdminEmployeesSection } from "./admin/AdminEmployeesSection";
import { AdminLeaveSection } from "./admin/AdminLeaveSection";
import { AdminPayslipsSection } from "./admin/AdminPayslipsSection";
import { AdminSettingsSection } from "./admin/AdminSettingsSection";

const adminNav = [
  { key: "dashboard", label: "Dashboard", icon: "DB" },
  { key: "employees", label: "Employees", icon: "EM" },
  { key: "leave", label: "Leave", icon: "LV" },
  { key: "payslips", label: "Payslips", icon: "PY" },
  { key: "settings", label: "Settings", icon: "ST" },
];

export const AdminDashboardPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const navItems = adminNav.map((item) => ({
    ...item,
    active: item.key === activeSection,
  }));

  const sections = {
    dashboard: {
      title: "Dashboard",
      subtitle: "Welcome back, Admin - here's your overview",
      content: <AdminOverviewSection />,
    },
    employees: {
      title: "Employees",
      subtitle: "Manage your team members",
      content: <AdminEmployeesSection />,
    },
    leave: {
      title: "Leave Management",
      subtitle: "Manage leave applications",
      content: <AdminLeaveSection />,
    },
    payslips: {
      title: "Payslips",
      subtitle: "Generate and manage employee payslips",
      content: <AdminPayslipsSection />,
    },
    settings: {
      title: "Settings",
      subtitle: "Manage your account and preferences",
      content: <AdminSettingsSection />,
    },
  };

  const activeView = sections[activeSection];

  return (
    <DashboardShell
      title={activeView.title}
      subtitle={activeView.subtitle}
      navItems={navItems}
      onSelectNav={setActiveSection}
    >
      {activeView.content}
    </DashboardShell>
  );
};

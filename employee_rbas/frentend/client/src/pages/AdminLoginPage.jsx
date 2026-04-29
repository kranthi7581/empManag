import { AuthShell } from "../components/AuthShell";
import { LoginForm } from "../components/LoginForm";
import { navigateTo } from "../utils/navigation";
import { appPath } from "../routes/routeConfig";

export const AdminLoginPage = () => {
  return (
    <AuthShell
      title="Admin Login"
      description="Access company settings, employee records, attendance, and payroll controls."
    >
      <div className="inline-meta">Administrator access only.</div>
      <LoginForm role="admin" />
      <button
        className="button-ghost"
        type="button"
        onClick={() => navigateTo(appPath.employeeLogin)}
      >
        Switch to employee login
      </button>
    </AuthShell>
  );
};

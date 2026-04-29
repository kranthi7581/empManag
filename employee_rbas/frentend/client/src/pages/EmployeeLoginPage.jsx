import { AuthShell } from "../components/AuthShell";
import { LoginForm } from "../components/LoginForm";
import { navigateTo } from "../utils/navigation";
import { appPath } from "../routes/routeConfig";

export const EmployeeLoginPage = () => {
  return (
    <AuthShell
      title="Employee Login"
      description="View your workspace, attendance history, approvals, and personal tasks."
    >
      <div className="inline-meta">Use your employee credentials to continue.</div>
      <LoginForm role="employee" />
      <button
        className="button-ghost"
        type="button"
        onClick={() => navigateTo(appPath.adminLogin)}
      >
        Switch to admin login
      </button>
    </AuthShell>
  );
};

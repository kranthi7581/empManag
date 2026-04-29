import { AuthShell } from "../components/AuthShell";
import { PortalOptionCard } from "../components/PortalOptionCard";
import { navigateTo } from "../utils/navigation";
import { appPath } from "../routes/routeConfig";

const portalOptions = [
  {
    title: "Admin Portal",
    description: "Manage workforce operations, approvals, and organization settings.",
    path: appPath.adminLogin,
  },
  {
    title: "Employee Portal",
    description: "Access attendance, requests, and personal workspace tools.",
    path: appPath.employeeLogin,
  },
];

export const PortalSelectionPage = () => {
  return (
    <AuthShell
      title="Welcome Back"
      description="Select your portal to securely access the system."
    >
      <div className="portal-grid">
        {portalOptions.map((portal, index) => (
          <PortalOptionCard
            key={portal.title}
            title={portal.title}
            description={portal.description}
            active={index === 0}
            onClick={() => navigateTo(portal.path)}
          />
        ))}
      </div>

      <p className="screen-footer">© 2026 GreatStack. All rights reserved.</p>
    </AuthShell>
  );
};

import { useAuth } from "../hooks/useAuth";
import { navigateTo } from "../utils/navigation";
import { appPath } from "../routes/routeConfig";

export const DashboardShell = ({
  title,
  subtitle,
  navItems,
  onSelectNav,
  profile,
  children,
}) => {
  const { session, signOut } = useAuth();
  const profileName = profile?.name || session?.user?.name || "Admin";
  const profileRole =
    profile?.roleLabel ||
    (session?.user?.role === "employee" ? "Employee" : "Administrator");
  const profileInitial =
    profile?.initial || profileName.slice(0, 1).toUpperCase();

  const handleLogout = () => {
    signOut();
    navigateTo(appPath.portalSelect);
  };

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">MS</div>
          <div>
            <strong>Employee MS</strong>
            <span>Management System</span>
          </div>
        </div>

        <section
          className="sidebar-profile-card clickable"
          onClick={() => onSelectNav?.("settings")}
        >
          <div className="sidebar-profile-avatar">{profileInitial}</div>
          <div>
            <strong>{profileName}</strong>
            <span>{profileRole}</span>
          </div>
        </section>

        <div className="sidebar-section-label">Navigation</div>

        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`sidebar-nav-item${item.active ? " is-active" : ""}`}
              onClick={() => onSelectNav?.(item.key)}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              <span className="sidebar-nav-chevron">{item.active ? ">" : ""}</span>
            </button>
          ))}
        </nav>

        <button className="sidebar-logout" type="button" onClick={handleLogout}>
          <span className="sidebar-nav-icon">LO</span>
          <span>Log out</span>
        </button>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-page-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </header>

        {children}
      </section>
    </main>
  );
};

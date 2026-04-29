import "./App.css";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useCurrentPath } from "./hooks/useCurrentPath";
import { useContext } from "react";
import { appPath } from "./routes/routeConfig";
import { navigateTo } from "./utils/navigation";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PortalSelectionPage } from "./pages/PortalSelectionPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { EmployeeLoginPage } from "./pages/EmployeeLoginPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { EmployeeDashboardPage } from "./pages/EmployeeDashboardPage";

const AppRouter = () => {
  const currentPath = useCurrentPath();
  const { session, loading } = useContext(AuthContext);

  const storedSession = (() => {
    try {
      return JSON.parse(localStorage.getItem("session") || "null");
    } catch {
      return null;
    }
  })();

  const activeSession = session || storedSession;

  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
    );
  }

  // Check if route requires authentication
  const isProtectedRoute = [
    appPath.adminDashboard,
    appPath.employeeDashboard,
  ].includes(currentPath);

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !activeSession?.user) {
    navigateTo(appPath.portalSelect);
    return <NotFoundPage />;
  }

  const userRole = (() => {
    const user = activeSession?.user;
    if (!user) return "";

    // Priority 0: Super Admin check
    if (user.isSuperAdmin) return "admin";

    // Priority 1: Populated role object name
    if (user.role?.name) return user.role.name.toLowerCase();
    
    // Priority 2: System role field
    if (user.systemRole) return user.systemRole.toLowerCase();

    // Priority 3: Role as a string (if it's not an ObjectId)
    if (typeof user.role === "string" && !user.role.match(/^[0-9a-fA-F]{24}$/)) {
      return user.role.toLowerCase();
    }

    return "";
  })();

  // Debug log to help identify routing issues
  if (isProtectedRoute) {
    console.log(`[Router] Path: ${currentPath}, UserRole: "${userRole}", Authenticated: ${!!activeSession?.user}`);
  }

  // Check role-based access for dashboards
  if (currentPath === appPath.adminDashboard && userRole !== "admin") {
    navigateTo(appPath.portalSelect);
    return <NotFoundPage />;
  }

  if (currentPath === appPath.employeeDashboard && userRole === "admin") {
    navigateTo(appPath.adminDashboard);
    return <NotFoundPage />;
  }

  const appRoutes = [
    { path: appPath.portalSelect, element: PortalSelectionPage },
    { path: appPath.adminLogin, element: AdminLoginPage },
    { path: appPath.employeeLogin, element: EmployeeLoginPage },
    { path: appPath.adminDashboard, element: AdminDashboardPage },
    { path: appPath.employeeDashboard, element: EmployeeDashboardPage },
  ];
  const activeRoute = appRoutes.find((route) => route.path === currentPath);

  if (!activeRoute) {
    return <NotFoundPage />;
  }

  const ActivePage = activeRoute.element;
  return <ActivePage />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;

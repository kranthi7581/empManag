import { Navigate } from "../utils/navigation";
import { appPath } from "../routes/routeConfig";

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  // Get token from localStorage
  const token = localStorage.getItem("authToken");

  // Get session from context
  const session = JSON.parse(localStorage.getItem("session") || "null");

  // Redirect to login if no token
  if (!token || !session?.user) {
    Navigate(appPath.portalSelect);
    return null;
  }

  // Check role if specified
  if (requiredRole) {
    const userRole = session.user.systemRole;
    if (userRole !== requiredRole) {
      Navigate(appPath.portalSelect);
      return null;
    }
  }

  return children;
};

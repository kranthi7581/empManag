import { useState } from "react";
import { login } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import { navigateTo } from "../utils/navigation";
import { appPath } from "../routes/routeConfig";

export const LoginForm = ({ role }) => {
  const { signIn } = useAuth();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const response = await login(formState.email, formState.password);
      signIn(response);
      setTimeout(() => {
        navigateTo(
          role === "admin" ? appPath.adminDashboard : appPath.employeeDashboard,
        );
      }, 0);
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message || "Unable to sign in right now.",
      });
      return;
    }

    setStatus({ loading: false, error: "" });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={`${role}-email`}>Email Address</label>
        <input
          id={`${role}-email`}
          name="email"
          type="email"
          placeholder={
            role === "admin" ? "admin@company.com" : "employee@company.com"
          }
          value={formState.email}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor={`${role}-password`}>Password</label>
        <input
          id={`${role}-password`}
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formState.password}
          onChange={handleChange}
        />
      </div>

      {status.error ? (
        <div className="status-banner">{status.error}</div>
      ) : null}

      <div className="button-row">
        <button
          className="button-primary"
          type="submit"
          disabled={status.loading}
        >
          {status.loading ? "Signing in..." : "Continue"}
        </button>
        <button
          className="button-secondary"
          type="button"
          onClick={() => navigateTo(appPath.portalSelect)}
        >
          Back to portals
        </button>
      </div>
    </form>
  );
};

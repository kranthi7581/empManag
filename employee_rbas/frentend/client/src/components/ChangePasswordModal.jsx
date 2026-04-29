import { useState } from "react";
import { changePassword } from "../api/authApi";

const initialFormState = {
  currentPassword: "",
  newPassword: "",
};

export const ChangePasswordModal = ({ open, onClose }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    if (status.error || status.success) {
      setStatus({ loading: false, error: "", success: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formState.currentPassword || !formState.newPassword) {
      setStatus({ loading: false, error: "All fields are required", success: "" });
      return;
    }

    setStatus({ loading: true, error: "", success: "" });
    try {
      await changePassword(formState);
      setStatus({
        loading: false,
        error: "",
        success: "Password updated successfully!",
      });
      setTimeout(() => {
        setFormState(initialFormState);
        setStatus({ loading: false, error: "", success: "" });
        onClose?.();
      }, 1500);
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || "Failed to update password",
        success: "",
      });
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="change-password-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="employee-modal-header">
          <div>
            <h2 id="change-password-title">Change Password</h2>
          </div>

          <button type="button" className="modal-close-button" onClick={onClose}>
            X
          </button>
        </div>

        <form className="employee-modal-form" onSubmit={handleSubmit}>
          {status.error && <div className="status-banner is-error">{status.error}</div>}
          {status.success && <div className="status-banner is-success">{status.success}</div>}

          <div className="change-password-grid">
            <label className="form-field form-field-full">
              <span>Current Password</span>
              <input
                name="currentPassword"
                type="password"
                value={formState.currentPassword}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-field form-field-full">
              <span>New Password</span>
              <input
                name="newPassword"
                type="password"
                value={formState.newPassword}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="employee-modal-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={onClose}
              disabled={status.loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary"
              disabled={status.loading}
            >
              {status.loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

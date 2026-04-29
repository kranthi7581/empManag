import { useState, useEffect } from "react";
import { ChangePasswordModal } from "../../components/ChangePasswordModal";
import { useAuth } from "../../hooks/useAuth";
import { updateUser } from "../../api/userApi";

export const EmployeeSettingsSection = () => {
  const { session, updateSessionUser } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    bio: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  // Load user data into form on mount
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        position: session.user.position || "",
        bio: session.user.bio || "",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear status when user starts typing
    if (status.error || status.success) {
      setStatus({ loading: false, error: "", success: "" });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!session?.user?._id) return;

    setStatus({ loading: true, error: "", success: "" });
    try {
      const response = await updateUser(session.user._id, formData);
      updateSessionUser(response.user);
      setStatus({
        loading: false,
        error: "",
        success: "Profile updated successfully!",
      });
    } catch (err) {
      setStatus({
        loading: false,
        error: err.message || "Failed to update profile",
        success: "",
      });
    }
  };

  return (
    <>
      <section className="settings-section">
        <form className="settings-profile-card" onSubmit={handleSave}>
          <div className="settings-card-header">
            <div className="settings-card-icon">P</div>
            <h3>Public Profile</h3>
          </div>

          {status.error && <div className="status-banner is-error">{status.error}</div>}
          {status.success && <div className="status-banner is-success">{status.success}</div>}

          <div className="settings-form-grid">
            <label className="form-field" htmlFor="settings-name">
              <span>Name</span>
              <input
                id="settings-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </label>

            <label className="form-field" htmlFor="settings-email">
              <span>Email</span>
              <input
                id="settings-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </label>

            <label className="form-field form-field-full" htmlFor="settings-position">
              <span>Position</span>
              <input
                id="settings-position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Senior Developer"
              />
            </label>

            <label className="form-field form-field-full" htmlFor="settings-bio">
              <span>Bio</span>
              <textarea
                id="settings-bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a short bio about yourself"
              />
            </label>
          </div>

          <p className="settings-help-text">This will be displayed on your profile.</p>

          <div className="settings-actions">
            <button
              type="submit"
              className="button-primary"
              disabled={status.loading}
            >
              {status.loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        <div className="settings-password-card">
          <div className="settings-password-copy">
            <div className="settings-card-icon">L</div>
            <div>
              <h3>Password</h3>
              <p>Update your account password</p>
            </div>
          </div>

          <button
            type="button"
            className="settings-change-button"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            Change
          </button>
        </div>
      </section>

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
};

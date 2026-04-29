import { useState } from "react";
import { ChangePasswordModal } from "../../components/ChangePasswordModal";

export const AdminSettingsSection = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <section className="settings-section">
        <div className="settings-profile-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">P</div>
            <h3>Public Profile</h3>
          </div>

          <div className="settings-form-grid">
            <label className="form-field">
              <span>Name</span>
              <input value="Admin" readOnly />
            </label>

            <label className="form-field">
              <span>Email</span>
              <input value="admin@example.com" readOnly />
            </label>

            <label className="form-field form-field-full">
              <span>Position</span>
              <input value="" readOnly />
            </label>

            <label className="form-field form-field-full">
              <span>Bio</span>
              <textarea rows="4" placeholder="Write a brief bio..." />
            </label>
          </div>

          <p className="settings-help-text">This will be displayed on your profile.</p>

          <div className="settings-actions">
            <button type="button" className="button-primary">
              Save Changes
            </button>
          </div>
        </div>

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

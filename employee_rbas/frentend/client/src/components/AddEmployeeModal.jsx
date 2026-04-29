import { useState } from "react";
import { createUser } from "../api/userApi";

const emptyFormState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  joinDate: "",
  bio: "",
  department: "",
  position: "",
  basicSalary: "0",
  allowances: "0",
  deductions: "0",
  workEmail: "",
  temporaryPassword: "",
  systemRole: "employee",
};

export const AddEmployeeModal = ({ open, onClose, onSaved }) => {
  const [formState, setFormState] = useState(emptyFormState);
  const [error, setError] = useState(null);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleClose = () => {
    setFormState(emptyFormState);
    setError(null);
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const payload = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      name: `${formState.firstName} ${formState.lastName}`.trim(),
      phoneNumber: formState.phoneNumber,
      joinDate: formState.joinDate,
      bio: formState.bio,
      department: formState.department,
      position: formState.position,
      basicSalary: Number(formState.basicSalary),
      allowances: Number(formState.allowances),
      deductions: Number(formState.deductions),
      email: formState.workEmail,
      password: formState.temporaryPassword,
      systemRole: formState.systemRole,
    };

    try {
      await createUser(payload);
      handleClose();
      onSaved?.();
      alert("Employee saved successfully.");
    } catch (err) {
      setError(err.message || err?.message || "Failed to save employee");
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={handleClose}>
      <div
        className="employee-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-employee-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="employee-modal-header">
          <div>
            <h2 id="add-employee-title">Add New Employee</h2>
            <p>Create a user account and employee profile</p>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <form className="employee-modal-form" onSubmit={handleSubmit}>
          {error ? <div className="form-error">{error}</div> : null}
          <section className="form-card">
            <div className="form-card-header">
              <h3>Personal Information</h3>
            </div>

            <div className="form-grid">
              <label className="form-field">
                <span>First Name</span>
                <input
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Last Name</span>
                <input
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Phone Number</span>
                <input
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Join Date</span>
                <input
                  name="joinDate"
                  type="date"
                  value={formState.joinDate}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field form-field-full">
                <span>Bio (Optional)</span>
                <textarea
                  name="bio"
                  rows="4"
                  placeholder="Brief description..."
                  value={formState.bio}
                  onChange={handleChange}
                />
              </label>
            </div>
          </section>

          <section className="form-card">
            <div className="form-card-header">
              <h3>Employment Details</h3>
            </div>

            <div className="form-grid">
              <label className="form-field">
                <span>Department</span>
                <select
                  name="department"
                  value={formState.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="marketing">Marketing</option>
                  <option value="engineering">Engineering</option>
                  <option value="hr">HR</option>
                </select>
              </label>

              <label className="form-field">
                <span>Position</span>
                <input
                  name="position"
                  value={formState.position}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Basic Salary</span>
                <input
                  name="basicSalary"
                  type="number"
                  value={formState.basicSalary}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Allowances</span>
                <input
                  name="allowances"
                  type="number"
                  value={formState.allowances}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Deductions</span>
                <input
                  name="deductions"
                  type="number"
                  value={formState.deductions}
                  onChange={handleChange}
                />
              </label>
            </div>
          </section>

          <section className="form-card">
            <div className="form-card-header">
              <h3>Account Setup</h3>
            </div>

            <div className="form-grid">
              <label className="form-field form-field-full">
                <span>Work Email</span>
                <input
                  name="workEmail"
                  type="email"
                  value={formState.workEmail}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>Temporary Password</span>
                <input
                  name="temporaryPassword"
                  type="password"
                  value={formState.temporaryPassword}
                  onChange={handleChange}
                />
              </label>

              <label className="form-field">
                <span>System Role</span>
                <select
                  name="systemRole"
                  value={formState.systemRole}
                  onChange={handleChange}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            </div>
          </section>

          <div className="employee-modal-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="button-primary">
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

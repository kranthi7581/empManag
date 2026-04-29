import { useState } from "react";

const initialFormState = {
  employee: "avinash",
  month: "1",
  year: "2026",
  basicSalary: "5000",
  allowances: "0",
  deductions: "0",
};

export const GeneratePayslipModal = ({ open, onClose }) => {
  const [formState, setFormState] = useState(initialFormState);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose?.();
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="payslip-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="generate-payslip-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="employee-modal-header">
          <div>
            <h2 id="generate-payslip-title">Generate Monthly Payslip</h2>
          </div>

          <button type="button" className="modal-close-button" onClick={onClose}>
            X
          </button>
        </div>

        <form className="employee-modal-form" onSubmit={handleSubmit}>
          <div className="payslip-form-grid">
            <label className="form-field form-field-full">
              <span>Employee</span>
              <select name="employee" value={formState.employee} onChange={handleChange}>
                <option value="avinash">Avinash Kr (Marketing Manager)</option>
                <option value="john">John Doe (Sr Developer)</option>
              </select>
            </label>

            <label className="form-field">
              <span>Month</span>
              <select name="month" value={formState.month} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>

            <label className="form-field">
              <span>Year</span>
              <input name="year" value={formState.year} onChange={handleChange} />
            </label>

            <label className="form-field form-field-full">
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

          <div className="employee-modal-actions">
            <button type="button" className="button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button-primary">
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

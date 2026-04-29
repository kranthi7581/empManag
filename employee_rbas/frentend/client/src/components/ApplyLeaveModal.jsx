import { useEffect, useState } from "react";

const initialFormState = {
  leaveType: "sick",
  fromDate: "",
  toDate: "",
  reason: "",
};

export const ApplyLeaveModal = ({
  open,
  onClose,
  onSubmit,
  submitting = false,
}) => {
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (open) {
      setFormState(initialFormState);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!onSubmit) {
      return onClose?.();
    }

    await onSubmit(formState);
    onClose?.();
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="leave-apply-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-leave-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="employee-modal-header">
          <div>
            <h2 id="apply-leave-title">Apply for Leave</h2>
            <p>Submit your leave request for approval</p>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <form className="employee-modal-form" onSubmit={handleSubmit}>
          <div className="leave-apply-grid">
            <label className="form-field form-field-full">
              <span>Leave Type</span>
              <select
                name="leaveType"
                value={formState.leaveType}
                onChange={handleChange}
              >
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="annual">Annual Leave</option>
              </select>
            </label>

            <div className="form-field form-field-full">
              <span>Duration</span>
              <div className="leave-date-range">
                <label className="form-field">
                  <span>From</span>
                  <input
                    name="fromDate"
                    type="date"
                    value={formState.fromDate}
                    onChange={handleChange}
                  />
                </label>

                <label className="form-field">
                  <span>To</span>
                  <input
                    name="toDate"
                    type="date"
                    value={formState.toDate}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <label className="form-field form-field-full">
              <span>Reason</span>
              <textarea
                name="reason"
                rows="4"
                placeholder="Briefly describe why you need this leave..."
                value={formState.reason}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="employee-modal-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

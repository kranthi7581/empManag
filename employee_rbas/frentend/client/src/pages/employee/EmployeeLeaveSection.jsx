import { useEffect, useMemo, useState } from "react";
import { ApplyLeaveModal } from "../../components/ApplyLeaveModal";
import { createLeave, getLeaves } from "../../api/leaveApi";

const formatDateRange = (fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  const fromOptions = { month: "short", day: "numeric" };
  const toOptions = { month: "short", day: "numeric", year: "numeric" };

  return `${from.toLocaleDateString(undefined, fromOptions)} - ${to.toLocaleDateString(undefined, toOptions)}`;
};

export const EmployeeLeaveSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchLeaves = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getLeaves();
      setLeaves(response.leaves || []);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load leave records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const leaveSummary = useMemo(() => {
    const counts = leaves.reduce(
      (acc, leave) => {
        acc[leave.type] = (acc[leave.type] || 0) + 1;
        return acc;
      },
      { sick: 0, casual: 0, annual: 0 },
    );

    return [
      { label: "Sick Leave", value: counts.sick, suffix: "taken", icon: "SL" },
      {
        label: "Casual Leave",
        value: counts.casual,
        suffix: "taken",
        icon: "CL",
      },
      {
        label: "Annual Leave",
        value: counts.annual,
        suffix: "taken",
        icon: "AL",
      },
    ];
  }, [leaves]);

  const handleLeaveSubmit = async (formState) => {
    setSubmitting(true);
    setError("");

    try {
      await createLeave({
        type: formState.leaveType,
        fromDate: formState.fromDate,
        toDate: formState.toDate,
        reason: formState.reason,
      });
      await fetchLeaves();
    } catch (submitError) {
      setError(submitError.message || "Unable to submit leave request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="employee-leave-section">
        <div className="employee-leave-toolbar">
          <button
            type="button"
            className="employees-add-button"
            onClick={() => setIsModalOpen(true)}
          >
            + Apply for Leave
          </button>
        </div>

        {error ? <div className="status-banner">{error}</div> : null}

        <section className="employee-dashboard-grid employee-leave-summary-grid">
          {leaveSummary.map((item) => (
            <article key={item.label} className="dashboard-stat-card">
              <div className="dashboard-stat-accent" />
              <div className="employee-stat-layout">
                <div className="dashboard-stat-icon employee-attendance-icon">
                  {item.icon}
                </div>
                <div className="dashboard-stat-copy">
                  <small>{item.label}</small>
                  <strong className="employee-leave-value">
                    {item.value}
                    <span>{item.suffix}</span>
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="leave-table-card employee-leave-table-card">
          <div className="employee-leave-table employee-leave-table-header">
            <div>Type</div>
            <div>Dates</div>
            <div>Reason</div>
            <div>Status</div>
          </div>

          {loading ? (
            <div className="employee-leave-table employee-leave-table-row">
              <div>Loading leave requests…</div>
            </div>
          ) : leaves.length ? (
            leaves.map((item) => (
              <div
                key={item._id}
                className="employee-leave-table employee-leave-table-row"
              >
                <div>
                  <span className="leave-type-badge">
                    {item.type.toUpperCase()}
                  </span>
                </div>
                <div>{formatDateRange(item.fromDate, item.toDate)}</div>
                <div>{item.reason}</div>
                <div>
                  <span className={`leave-status-badge is-${item.status}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="employee-leave-table employee-leave-table-row">
              <div>No leave requests submitted yet.</div>
            </div>
          )}
        </div>
      </section>

      <ApplyLeaveModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleLeaveSubmit}
        submitting={submitting}
      />
    </>
  );
};

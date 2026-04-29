export const EmployeeOverviewSection = ({ onNavigate }) => {
  return (
    <>
      <section className="employee-dashboard-grid">
        {[
          { label: "Days Present", value: "1", icon: "AT" },
          { label: "Pending Leaves", value: "0", icon: "LV" },
          { label: "Latest Payslip", value: "$59,000", icon: "PY" },
        ].map((stat) => (
          <article key={stat.label} className="dashboard-stat-card">
            <div className="dashboard-stat-accent" />
            <div className="dashboard-stat-copy">
              <small>{stat.label}</small>
              <strong>{stat.value}</strong>
            </div>
            <div className="dashboard-stat-icon">{stat.icon}</div>
          </article>
        ))}
      </section>

      <div className="employee-dashboard-actions">
        <button
          type="button"
          className="button-primary employee-action-primary"
          onClick={() => onNavigate?.("attendance")}
        >
          Mark Attendance
        </button>
        <button
          type="button"
          className="button-secondary employee-action-secondary"
          onClick={() => onNavigate?.("leave")}
        >
          Apply for Leave
        </button>
      </div>
    </>
  );
};

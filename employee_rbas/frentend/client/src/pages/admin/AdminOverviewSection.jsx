const stats = [
  { label: "Total Employees", value: "2", icon: "TE" },
  { label: "Departments", value: "10", icon: "DP" },
  { label: "Today's Attendance", value: "0", icon: "AT" },
  { label: "Pending Leaves", value: "0", icon: "LV" },
];

export const AdminOverviewSection = () => {
  return (
    <section className="dashboard-stats-grid">
      {stats.map((stat) => (
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
  );
};

import { useEffect, useMemo, useState } from "react";
import {
  getAttendances,
  createAttendance,
  updateAttendance,
} from "../../api/attendanceApi";

const getDayKey = (dateValue) => {
  const date = new Date(dateValue);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (dateValue) => {
  if (!dateValue) return "-";

  const date = new Date(dateValue);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatHours = (hours) => {
  if (hours === undefined || hours === null || Number.isNaN(hours)) {
    return "-";
  }

  return `${Number(hours).toFixed(2)} hrs`;
};

export const EmployeeAttendanceSection = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const todayKey = useMemo(() => getDayKey(new Date()), []);

  const fetchAttendances = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAttendances();
      setAttendances(response.attendances || []);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load attendance records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  const openAttendance = useMemo(
    () => attendances.find((record) => !record.checkOut),
    [attendances],
  );

  const attendanceStats = useMemo(() => {
    const daysPresent = attendances.filter((record) => record.checkIn).length;
    const lateArrivals = attendances.filter(
      (record) => record.status === "LATE",
    ).length;
    const averageHours = attendances
      .filter(
        (record) =>
          record.workingHours !== undefined && record.workingHours !== null,
      )
      .map((record) => record.workingHours);

    const average = averageHours.length
      ? averageHours.reduce((sum, value) => sum + value, 0) /
        averageHours.length
      : 0;

    return [
      { label: "Days Present", value: daysPresent.toString(), icon: "AT" },
      { label: "Late Arrivals", value: lateArrivals.toString(), icon: "LT" },
      {
        label: "Avg. Work Hrs",
        value: `${average.toFixed(2)} Hrs`,
        icon: "HR",
      },
    ];
  }, [attendances]);

  const recentActivity = useMemo(
    () =>
      attendances
        .slice()
        .sort(
          (a, b) =>
            new Date(b.date || b.checkIn) - new Date(a.date || a.checkIn),
        ),
    [attendances],
  );

  const isClockedIn = Boolean(openAttendance);
  const buttonLabel = isClockedIn ? "Clock Out" : "Clock In";
  const buttonDescription = isClockedIn
    ? "Click to end your shift"
    : "Click to start your shift";

  const handleClockToggle = async () => {
    try {
      setLoading(true);
      setError("");

      const now = new Date().toISOString();

      if (isClockedIn && openAttendance) {
        await updateAttendance(openAttendance._id, { checkOut: now });
      } else {
        await createAttendance({
          date: now,
          checkIn: now,
        });
      }

      await fetchAttendances();
    } catch (actionError) {
      setError(actionError.message || "Unable to update attendance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="employee-attendance-section">
      {error ? <div className="status-banner">{error}</div> : null}

      <div className="employee-dashboard-grid">
        {attendanceStats.map((stat) => (
          <article key={stat.label} className="dashboard-stat-card">
            <div className="dashboard-stat-accent" />
            <div className="employee-stat-layout">
              <div className="dashboard-stat-icon employee-attendance-icon">
                {stat.icon}
              </div>
              <div className="dashboard-stat-copy">
                <small>{stat.label}</small>
                <strong>{stat.value}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="employee-activity-card">
        <div className="employee-activity-header">
          <h3>Recent Activity</h3>
        </div>

        <div className="employee-activity-table employee-activity-table-header">
          <div>Date</div>
          <div>Check In</div>
          <div>Check Out</div>
          <div>Working Hours</div>
          <div>Day Type</div>
          <div>Status</div>
        </div>

        {loading ? (
          <div className="employee-activity-table employee-activity-table-row">
            <div>Loading attendance...</div>
          </div>
        ) : recentActivity.length ? (
          recentActivity.map((item) => (
            <div
              key={item._id}
              className="employee-activity-table employee-activity-table-row"
            >
              <div className="employee-activity-date">
                {formatDate(item.date || item.checkIn)}
              </div>
              <div>{formatTime(item.checkIn)}</div>
              <div>{item.checkOut ? formatTime(item.checkOut) : "-"}</div>
              <div>
                {item.checkOut ? formatHours(item.workingHours) : "ongoing"}
              </div>
              <div>
                <span className="employee-daytype-badge">
                  {item.dayType ||
                    (item.checkOut ? "Completed" : "In Progress")}
                </span>
              </div>
              <div>
                <span className="employee-status-badge">
                  {item.status || (item.checkOut ? "OK" : "OPEN")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="employee-activity-table employee-activity-table-row">
            <div>No attendance records found.</div>
          </div>
        )}
      </div>

      <button
        type="button"
        className="employee-clockout-panel"
        onClick={handleClockToggle}
        disabled={loading}
      >
        <div className="employee-clockout-icon">LO</div>
        <div>
          <strong>{buttonLabel}</strong>
          <p>{buttonDescription}</p>
        </div>
      </button>
    </section>
  );
};

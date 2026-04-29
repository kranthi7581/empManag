import { useEffect, useState } from "react";
import { getLeaves, updateLeave } from "../../api/leaveApi";

const formatLeaveDateRange = (fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const fromOptions = { month: "short", day: "numeric" };
  const toOptions = { month: "short", day: "numeric", year: "numeric" };

  return `${from.toLocaleDateString(undefined, fromOptions)} - ${to.toLocaleDateString(undefined, toOptions)}`;
};

export const AdminLeaveSection = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLeaveRequests = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getLeaves();
      setLeaveRequests(response.leaves || []);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const updateRequestStatus = async (requestId, status) => {
    setActionLoading(true);
    setError("");

    try {
      await updateLeave(requestId, { status });
      await fetchLeaveRequests();
    } catch (requestError) {
      setError(requestError.message || "Unable to update leave status.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="leave-section">
      {error ? <div className="status-banner">{error}</div> : null}
      <div className="leave-table-card">
        <div className="leave-table leave-table-header">
          <div>Employee</div>
          <div>Type</div>
          <div>Dates</div>
          <div>Reason</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {loading ? (
          <div className="leave-table leave-table-row">
            <div>Loading leave requests…</div>
          </div>
        ) : leaveRequests.length ? (
          leaveRequests.map((request) => (
            <div key={request._id} className="leave-table leave-table-row">
              <div>
                <div className="leave-employee-name">{request.user?.name || request.user?.email || "Unknown"}</div>
              </div>
              <div>
                <span className="leave-type-badge">{request.type?.toUpperCase()}</span>
              </div>
              <div>{formatLeaveDateRange(request.fromDate, request.toDate)}</div>
              <div>{request.reason}</div>
              <div>
                <span className={`leave-status-badge is-${request.status}`}>
                  {request.status?.toUpperCase()}
                </span>
              </div>
              <div className="leave-actions-cell">
                {request.status === "pending" ? (
                  <>
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => updateRequestStatus(request._id, "approved")}
                      disabled={actionLoading}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => updateRequestStatus(request._id, "declined")}
                      disabled={actionLoading}
                    >
                      Decline
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <div className="leave-table leave-table-row">
            <div>No leave requests found.</div>
          </div>
        )}
      </div>
    </section>
  );
};

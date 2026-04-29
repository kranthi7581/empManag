import { useEffect, useMemo, useState } from "react";
import { AddEmployeeModal } from "../../components/AddEmployeeModal";
import { getUsers } from "../../api/userApi";

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const AdminEmployeesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const loadEmployees = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getUsers();
      setEmployees(response.users || []);
    } catch (err) {
      setError(err.message || "Unable to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const visibleEmployees = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return employees.filter((employee) => {
      const name = employee.name?.toLowerCase() || "";
      const position = employee.position?.toLowerCase() || "";
      const department = employee.department?.toLowerCase() || "";
      const email = employee.email?.toLowerCase() || "";

      const matchesSearch =
        !normalizedSearch ||
        name.includes(normalizedSearch) ||
        position.includes(normalizedSearch) ||
        department.includes(normalizedSearch) ||
        email.includes(normalizedSearch);

      const matchesDepartment =
        departmentFilter === "all" || department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, departmentFilter]);

  return (
    <>
      <section className="employees-section">
        <div className="employees-toolbar">
          <div className="employees-search">
            <span className="employees-search-icon">S</span>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm ?? ""}
              onChange={(event) => setSearchTerm(event.target.value ?? "")}
            />
          </div>

          <select
            className="employees-filter"
            value={departmentFilter ?? "all"}
            onChange={(event) => setDepartmentFilter(event.target.value ?? "all")}
          >
            <option value="all">All Departments</option>
            <option value="marketing">Marketing</option>
            <option value="engineering">Engineering</option>
            <option value="hr">HR</option>
          </select>

          <button
            className="employees-add-button"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Employee
          </button>
        </div>

        {loading ? (
          <div className="employees-loading">Loading employees…</div>
        ) : error ? (
          <div className="employees-error">{error}</div>
        ) : (
          <div className="employee-cards-grid">
            {visibleEmployees.length === 0 ? (
              <div className="employees-empty">No employees found.</div>
            ) : (
              visibleEmployees.map((employee) => (
                <article key={employee._id} className="employee-card">
                <div className="employee-card-top">
                  <div className="employee-card-tags">
                    <span className="employee-tag">
                      {employee.department || "Unknown"}
                    </span>
                  </div>

                  <div className="employee-avatar">
                    {getInitials(employee.name)}
                  </div>
                </div>

                <div className="employee-card-bottom">
                  <div>
                    <h3>{employee.name}</h3>
                    <p>
                      {employee.position || employee.systemRole || "Employee"}
                    </p>
                  </div>

                  <div className="employee-card-actions">
                    <button type="button" className="employee-icon-button">
                      E
                    </button>
                    <button type="button" className="employee-icon-button">
                      D
                    </button>
                  </div>
                </div>
              </article>
            ))) }
          </div>
        )}
      </section>

      <AddEmployeeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={loadEmployees}
      />
    </>
  );
};

import { useState } from "react";
import { GeneratePayslipModal } from "../../components/GeneratePayslipModal";
import { PayslipPreviewModal } from "../../components/PayslipPreviewModal";

const payslipRows = [
  {
    id: 1,
    employee: "John Doe",
    position: "Sr Developer",
    email: "john@example.com",
    period: "March 2026",
    basicSalary: 50000,
    allowances: 10000,
    deductions: 1000,
    netSalary: 59000,
  },
];

export const AdminPayslipsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  return (
    <>
      <section className="payslips-section">
        <div className="payslips-toolbar">
          <button
            type="button"
            className="employees-add-button"
            onClick={() => setIsModalOpen(true)}
          >
            + Generate Payslip
          </button>
        </div>

        <div className="leave-table-card payslips-table-card">
          <div className="payslips-table payslips-table-header">
            <div>Employee</div>
            <div>Period</div>
            <div>Basic Salary</div>
            <div>Net Salary</div>
            <div>Actions</div>
          </div>

          {payslipRows.map((row) => (
            <div key={row.id} className="payslips-table payslips-table-row">
              <div className="leave-employee-name">{row.employee}</div>
              <div>{row.period}</div>
              <div>$50,000</div>
              <div className="payslip-net-salary">$59,000</div>
              <div>
                <button
                  type="button"
                  className="payslip-download-button"
                  onClick={() => setSelectedPayslip(row)}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GeneratePayslipModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PayslipPreviewModal
        open={Boolean(selectedPayslip)}
        payslip={selectedPayslip}
        onClose={() => setSelectedPayslip(null)}
      />
    </>
  );
};

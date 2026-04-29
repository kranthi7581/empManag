import { useState } from "react";
import { PayslipPreviewModal } from "../../components/PayslipPreviewModal";

const payslipHistory = [
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

export const EmployeePayslipsSection = () => {
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  return (
    <>
      <section className="employee-payslips-section">
        <div className="leave-table-card employee-payslips-table-card">
          <div className="employee-payslips-table employee-payslips-table-header">
            <div>Period</div>
            <div>Basic Salary</div>
            <div>Net Salary</div>
            <div>Actions</div>
          </div>

          {payslipHistory.map((item) => (
            <div key={item.id} className="employee-payslips-table employee-payslips-table-row">
              <div>{item.period}</div>
              <div>$50,000</div>
              <div className="payslip-net-salary">$59,000</div>
              <div>
                <button
                  type="button"
                  className="payslip-download-button"
                  onClick={() => setSelectedPayslip(item)}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PayslipPreviewModal
        open={Boolean(selectedPayslip)}
        payslip={selectedPayslip}
        onClose={() => setSelectedPayslip(null)}
      />
    </>
  );
};

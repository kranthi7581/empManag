const currency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const buildPrintableMarkup = (payslip) => {
  const netSalary = payslip.basicSalary + payslip.allowances - payslip.deductions;

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Payslip - ${payslip.employee}</title>
      <style>
        body {
          margin: 0;
          font-family: "Segoe UI", Arial, sans-serif;
          color: #16263d;
          background: #ffffff;
        }
        .sheet {
          width: min(760px, calc(100% - 48px));
          margin: 40px auto;
        }
        .hero {
          text-align: center;
        }
        .hero h1 {
          margin: 0;
          font-size: 54px;
          font-weight: 700;
        }
        .hero p {
          margin: 12px 0 0;
          font-size: 28px;
          color: #708293;
        }
        .divider {
          margin: 42px 0;
          border: 0;
          border-top: 1px solid #dfe8ef;
        }
        .meta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 30px 48px;
        }
        .meta small {
          display: block;
          font-size: 18px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #93a3b2;
        }
        .meta strong {
          display: block;
          margin-top: 10px;
          font-size: 24px;
        }
        .table {
          margin-top: 42px;
          border: 1px solid #e2ebf1;
          border-radius: 18px;
          overflow: hidden;
        }
        .row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          padding: 22px 24px;
          font-size: 21px;
          border-top: 1px solid #edf3f6;
        }
        .row:first-child {
          border-top: 0;
          background: #f7fbfb;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #64788a;
        }
        .row.total {
          background: #f7fbfb;
          font-weight: 700;
          font-size: 24px;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .sheet {
            margin: 0 auto;
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <main class="sheet">
        <header class="hero">
          <h1>PAYSLIP</h1>
          <p>${payslip.period}</p>
        </header>
        <hr class="divider" />
        <section class="meta">
          <div>
            <small>Employee Name</small>
            <strong>${payslip.employee}</strong>
          </div>
          <div>
            <small>Position</small>
            <strong>${payslip.position}</strong>
          </div>
          <div>
            <small>Email</small>
            <strong>${payslip.email}</strong>
          </div>
          <div>
            <small>Period</small>
            <strong>${payslip.period}</strong>
          </div>
        </section>
        <section class="table">
          <div class="row"><span>Description</span><span>Amount</span></div>
          <div class="row"><span>Basic Salary</span><strong>${currency(payslip.basicSalary)}</strong></div>
          <div class="row"><span>Allowances</span><strong>+${currency(payslip.allowances)}</strong></div>
          <div class="row"><span>Deductions</span><strong>-${currency(payslip.deductions)}</strong></div>
          <div class="row total"><span>Net Salary</span><span>${currency(netSalary)}</span></div>
        </section>
      </main>
      <script>
        window.onload = () => {
          window.print();
        };
      </script>
    </body>
  </html>`;
};

export const PayslipPreviewModal = ({ open, payslip, onClose }) => {
  if (!open || !payslip) {
    return null;
  }

  const netSalary = payslip.basicSalary + payslip.allowances - payslip.deductions;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=900,height=900");

    if (!printWindow) {
      return;
    }

    printWindow.document.open();
    printWindow.document.write(buildPrintableMarkup(payslip));
    printWindow.document.close();
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="payslip-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payslip-preview-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="payslip-preview-sheet">
          <header className="payslip-preview-hero">
            <h2 id="payslip-preview-title">PAYSLIP</h2>
            <p>{payslip.period}</p>
          </header>

          <div className="payslip-preview-divider" />

          <section className="payslip-preview-meta">
            <div>
              <small>Employee Name</small>
              <strong>{payslip.employee}</strong>
            </div>
            <div>
              <small>Position</small>
              <strong>{payslip.position}</strong>
            </div>
            <div>
              <small>Email</small>
              <strong>{payslip.email}</strong>
            </div>
            <div>
              <small>Period</small>
              <strong>{payslip.period}</strong>
            </div>
          </section>

          <section className="payslip-preview-table">
            <div className="payslip-preview-row payslip-preview-row-header">
              <span>Description</span>
              <span>Amount</span>
            </div>
            <div className="payslip-preview-row">
              <span>Basic Salary</span>
              <strong>{currency(payslip.basicSalary)}</strong>
            </div>
            <div className="payslip-preview-row">
              <span>Allowances</span>
              <strong>+{currency(payslip.allowances)}</strong>
            </div>
            <div className="payslip-preview-row">
              <span>Deductions</span>
              <strong>-{currency(payslip.deductions)}</strong>
            </div>
            <div className="payslip-preview-row payslip-preview-row-total">
              <span>Net Salary</span>
              <strong>{currency(netSalary)}</strong>
            </div>
          </section>

          <div className="payslip-preview-actions">
            <button type="button" className="button-primary" onClick={handlePrint}>
              Print Payslip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

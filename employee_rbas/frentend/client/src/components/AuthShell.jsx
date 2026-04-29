import heroImage from "../assets/hero.png";

export const AuthShell = ({ title, description, children }) => {
  return (
    <main className="auth-shell">
      <section className="brand-panel">
        <img className="brand-image" src={heroImage} alt="" aria-hidden="true" />

        <div className="brand-copy">
          <span className="brand-badge">GreatStack Workspace</span>
          <h1>Employee Management System</h1>
          <p>
            Streamline your workforce operations, track attendance, manage payroll,
            and empower your team securely.
          </p>
        </div>
      </section>

      <section className="content-panel">
        <div className="content-card">
          <header className="content-heading">
            <h2>{title}</h2>
            <p>{description}</p>
          </header>
          {children}
        </div>
      </section>
    </main>
  );
};

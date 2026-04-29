import { navigateTo } from "../utils/navigation";
import { appPath } from "../routes/routeConfig";

export const NotFoundPage = () => {
  return (
    <main className="empty-state">
      <section className="empty-state-card">
        <h2>Page not found</h2>
        <p>The page you requested does not exist in this workspace.</p>
        <div className="button-row">
          <button
            className="button-primary"
            type="button"
            onClick={() => navigateTo(appPath.portalSelect)}
          >
            Go to login
          </button>
        </div>
      </section>
    </main>
  );
};

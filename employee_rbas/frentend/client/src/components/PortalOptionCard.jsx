export const PortalOptionCard = ({
  title,
  description,
  active = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`portal-card${active ? " is-active" : ""}`}
      onClick={onClick}
    >
      <span>
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <span className="portal-arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
};

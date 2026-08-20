const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: "◧" },
  { key: "services", label: "Services", icon: "▤" },
  { key: "events", label: "Events", icon: "≋" },
  { key: "cluster", label: "Cluster", icon: "⬡" },
];

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="dp-sidebar">
      <div className="dp-sidebar__brand">
        <span className="dp-sidebar__mark" aria-hidden="true" />
        <span className="dp-sidebar__brand-text">DevOpsPulse</span>
      </div>

      <nav className="dp-sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={
              "dp-sidebar__item" +
              (active === item.key ? " dp-sidebar__item--active" : "")
            }
            onClick={() => onSelect(item.key)}
          >
            <span className="dp-sidebar__icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="dp-sidebar__footer">
        <span className="dp-sidebar__footer-label">cluster</span>
        <span className="dp-sidebar__footer-value">eks-dev-1</span>
      </div>
    </aside>
  );
}

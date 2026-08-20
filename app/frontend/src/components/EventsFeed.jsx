function relativeTime(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  return `${hours}h ago`;
}

const TYPE_ICON = {
  success: "✓",
  warning: "⚠",
};

export default function EventsFeed({ events }) {
  return (
    <div className="dp-card dp-events">
      <div className="dp-card__header">
        <span className="dp-card__eyebrow">activity</span>
        <h2>Recent events</h2>
      </div>

      {events.length === 0 ? (
        <p className="dp-empty">No events in the current window.</p>
      ) : (
        <ul className="dp-events__list">
          {events.map((e) => (
            <li key={e.id} className={`dp-events__item dp-events__item--${e.type}`}>
              <span className="dp-events__icon" aria-hidden="true">
                {TYPE_ICON[e.type] ?? "•"}
              </span>
              <span className="dp-events__message">{e.message}</span>
              <span className="dp-events__time">{relativeTime(e.time)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

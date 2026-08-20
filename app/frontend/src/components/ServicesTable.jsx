const STATUS_LABEL = {
  healthy: "Healthy",
  degraded: "Degraded",
};

export default function ServicesTable({ services }) {
  return (
    <div className="dp-card dp-services">
      <div className="dp-card__header">
        <span className="dp-card__eyebrow">workloads</span>
        <h2>Services</h2>
      </div>

      <div className="dp-services__table" role="table">
        <div className="dp-services__row dp-services__row--head" role="row">
          <span role="columnheader">Service</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">Pods</span>
          <span role="columnheader">Uptime</span>
        </div>
        {services.map((s) => (
          <div className="dp-services__row" role="row" key={s.name}>
            <span role="cell" className="dp-services__name">{s.name}</span>
            <span role="cell">
              <span className={`dp-badge dp-badge--${s.status === "healthy" ? "teal" : "amber"}`}>
                <i className={`dp-dot dp-dot--${s.status === "healthy" ? "teal" : "amber"}`} />
                {STATUS_LABEL[s.status] ?? s.status}
              </span>
            </span>
            <span role="cell">{s.podsRunning}/{s.podsDesired}</span>
            <span role="cell">{s.uptimePercent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

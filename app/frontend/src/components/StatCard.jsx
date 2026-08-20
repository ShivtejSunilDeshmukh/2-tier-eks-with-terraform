export default function StatCard({ icon, label, value, sublabel, tone = "teal" }) {
  return (
    <div className="dp-card dp-stat">
      <div className="dp-stat__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="dp-stat__body">
        <span className="dp-stat__label">{label}</span>
        <span className="dp-stat__value">{value}</span>
        <span className={`dp-stat__sublabel dp-stat__sublabel--${tone}`}>
          {sublabel}
        </span>
      </div>
    </div>
  );
}

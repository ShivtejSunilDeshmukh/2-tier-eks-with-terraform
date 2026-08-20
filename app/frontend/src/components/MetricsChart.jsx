import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="dp-chart__tooltip">
      <div className="dp-chart__tooltip-time">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="dp-chart__tooltip-row">
          <span
            className="dp-chart__tooltip-swatch"
            style={{ background: p.color }}
          />
          {p.name}: {p.value}%
        </div>
      ))}
    </div>
  );
}

export default function MetricsChart({ data }) {
  return (
    <div className="dp-card dp-chart">
      <div className="dp-card__header">
        <span className="dp-card__eyebrow">resource usage</span>
        <h2>CPU / Memory</h2>
      </div>
      <div className="dp-chart__canvas">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="cpuFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="memFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--blue)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--blue)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--line)" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: "var(--text-faint)", fontSize: 11 }}
              axisLine={{ stroke: "var(--line)" }}
              tickLine={false}
              minTickGap={24}
            />
            <YAxis
              tick={{ fill: "var(--text-faint)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={32}
              domain={[0, 100]}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="cpu"
              name="CPU"
              stroke="var(--teal)"
              strokeWidth={2}
              fill="url(#cpuFill)"
            />
            <Area
              type="monotone"
              dataKey="memory"
              name="Memory"
              stroke="var(--blue)"
              strokeWidth={2}
              fill="url(#memFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="dp-chart__legend">
        <span><i className="dp-dot dp-dot--teal" /> CPU</span>
        <span><i className="dp-dot dp-dot--blue" /> Memory</span>
      </div>
    </div>
  );
}

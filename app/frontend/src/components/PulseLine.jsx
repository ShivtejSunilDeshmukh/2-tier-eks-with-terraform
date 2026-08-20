// The signature element: a continuous heartbeat waveform in the top bar.
// Its color and beat speed reflect real overall system status, rather
// than existing as pure decoration.
const STATUS_COLOR = {
  healthy: "var(--teal)",
  warning: "var(--amber)",
  critical: "var(--red)",
};

const STATUS_SPEED = {
  healthy: "2.6s",
  warning: "1.6s",
  critical: "1s",
};

// A single EKG-style segment repeated to fill the width via CSS animation.
const SEGMENT =
  "M0,20 L18,20 L24,20 L28,6 L34,34 L39,20 L46,20 L50,12 L54,20 L120,20";

export default function PulseLine({ status = "healthy" }) {
  const color = STATUS_COLOR[status] ?? STATUS_COLOR.healthy;
  const speed = STATUS_SPEED[status] ?? STATUS_SPEED.healthy;

  return (
    <div className="dp-pulse" style={{ "--pulse-color": color, "--pulse-speed": speed }}>
      <svg
        className="dp-pulse__svg"
        viewBox="0 0 240 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g className="dp-pulse__track">
          <path d={SEGMENT} />
          <path d={SEGMENT} transform="translate(120,0)" />
          <path d={SEGMENT} transform="translate(240,0)" />
        </g>
      </svg>
      <span className="dp-pulse__label">{status}</span>
    </div>
  );
}

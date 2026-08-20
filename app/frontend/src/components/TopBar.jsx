import PulseLine from "./PulseLine.jsx";

export default function TopBar({ status, connected }) {
  return (
    <header className="dp-topbar">
      <div className="dp-topbar__title">
        <span className="dp-topbar__eyebrow">infrastructure overview</span>
        <h1>Cluster telemetry</h1>
      </div>

      <div className="dp-topbar__right">
        <PulseLine status={status} />
        <div className="dp-topbar__conn">
          <span
            className={
              "dp-dot" + (connected ? " dp-dot--teal" : " dp-dot--red")
            }
          />
          {connected ? "Live" : "Reconnecting…"}
        </div>
      </div>
    </header>
  );
}

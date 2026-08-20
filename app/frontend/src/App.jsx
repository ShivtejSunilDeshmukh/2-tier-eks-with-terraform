import { useEffect, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import StatCard from "./components/StatCard.jsx";
import MetricsChart from "./components/MetricsChart.jsx";
import EventsFeed from "./components/EventsFeed.jsx";
import ServicesTable from "./components/ServicesTable.jsx";
import { api } from "./api.js";
import "./styles/app.css";

const POLL_MS = 5000;

function overallStatus(stats, services) {
  const anyDegraded = services.some((s) => s.status !== "healthy");
  if (anyDegraded) return "warning";
  if (stats && (stats.cpuPercent > 85 || stats.memoryPercent > 85)) return "warning";
  return "healthy";
}

export default function App() {
  const [active, setActive] = useState("overview");
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [connected, setConnected] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [statsRes, historyRes, eventsRes, servicesRes] = await Promise.all([
        api.stats(),
        api.statsHistory(20),
        api.events(8),
        api.services(),
      ]);
      setStats(statsRes);
      setHistory(historyRes);
      setEvents(eventsRes);
      setServices(servicesRes);
      setConnected(true);
    } catch (err) {
      console.error(err);
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  const status = overallStatus(stats, services);

  return (
    <div className="dp-shell">
      <Sidebar active={active} onSelect={setActive} />

      <main className="dp-main">
        <TopBar status={status} connected={connected} />

        {!stats ? (
          <div className="dp-loading">Reading cluster telemetry…</div>
        ) : (
          <>
            <section className="dp-grid dp-grid--stats">
              <StatCard
                icon="🖥"
                label="Nodes"
                value={stats.nodes}
                sublabel={`${stats.nodesHealthy} healthy`}
                tone="teal"
              />
              <StatCard
                icon="📦"
                label="Pods"
                value={stats.podsRunning}
                sublabel="Running"
                tone="teal"
              />
              <StatCard
                icon="⚡"
                label="CPU"
                value={`${stats.cpuPercent}%`}
                sublabel={stats.cpuPercent > 70 ? "Elevated" : "Normal"}
                tone={stats.cpuPercent > 70 ? "amber" : "teal"}
              />
              <StatCard
                icon="💾"
                label="Memory"
                value={`${stats.memoryPercent}%`}
                sublabel={stats.memoryPercent > 70 ? "Elevated" : "Normal"}
                tone={stats.memoryPercent > 70 ? "amber" : "teal"}
              />
            </section>

            <section className="dp-grid dp-grid--main">
              <MetricsChart data={history} />
              <EventsFeed events={events} />
            </section>

            <section className="dp-grid dp-grid--full">
              <ServicesTable services={services} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

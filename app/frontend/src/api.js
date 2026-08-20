const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  health: () => get("/health"),
  stats: () => get("/stats"),
  statsHistory: (points = 20) => get(`/stats/history?points=${points}`),
  events: (limit = 8) => get(`/events?limit=${limit}`),
  services: () => get("/services"),
};

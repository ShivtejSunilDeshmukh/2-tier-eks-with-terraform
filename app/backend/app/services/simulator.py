"""
In-memory simulation of cluster/service metrics.

This exists so the frontend has something realistic to render before we
wire the backend up to the real Kubernetes API (kubernetes-python client)
or a metrics source like Prometheus. Every function here is the seam
we'll swap out later -- the router layer never changes.
"""
import math
import random
import time
from datetime import datetime, timedelta, timezone

_START = time.time()

_SERVICES = [
    {"name": "frontend", "desired": 2},
    {"name": "backend-api", "desired": 2},
    {"name": "database", "desired": 1},
]

_EVENT_POOL = [
    ("success", "Backend deployment completed"),
    ("success", "Pod started: backend-api-{n}"),
    ("success", "Rolling update finished for frontend"),
    ("warning", "CPU usage crossed 70%"),
    ("warning", "Pod restarted: database-0"),
    ("success", "Node healthy: ip-10-0-{n}.ec2.internal"),
    ("warning", "Readiness probe failing for frontend-{n}"),
    ("success", "HPA scaled backend-api to {n} replicas"),
]

# A fixed, seeded event log so refreshes feel consistent within a session
# instead of jumping around randomly on every poll.
_rng = random.Random(42)
_events_cache = None


def _uptime_seconds() -> float:
    return time.time() - _START


def get_stats() -> dict:
    t = _uptime_seconds()
    # Smooth pseudo-random oscillation so charts look alive rather than flat.
    cpu = 34 + 12 * random.random() + 6 * _wave(t, period=45)
    mem = 61 + 8 * random.random() + 5 * _wave(t, period=70)
    return {
        "nodes": 2,
        "nodesHealthy": 2,
        "pods": sum(s["desired"] for s in _SERVICES) + random.choice([0, 0, 0, 1]),
        "podsRunning": sum(s["desired"] for s in _SERVICES),
        "cpuPercent": round(_clamp(cpu, 5, 95), 1),
        "memoryPercent": round(_clamp(mem, 5, 95), 1),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


def get_history(points: int = 20) -> list[dict]:
    """Recent CPU/memory samples for the sparkline/chart."""
    now = time.time()
    out = []
    for i in range(points, 0, -1):
        t = now - i * 15
        cpu = 34 + 12 * _pseudo(t) + 6 * _wave(t, period=45)
        mem = 61 + 8 * _pseudo(t + 1000) + 5 * _wave(t, period=70)
        out.append(
            {
                "time": datetime.fromtimestamp(t, tz=timezone.utc).strftime("%H:%M:%S"),
                "cpu": round(_clamp(cpu, 5, 95), 1),
                "memory": round(_clamp(mem, 5, 95), 1),
            }
        )
    return out


def get_events(limit: int = 8) -> list[dict]:
    global _events_cache
    if _events_cache is None:
        now = datetime.now(timezone.utc)
        events = []
        for i in range(12):
            kind, template = _rng.choice(_EVENT_POOL)
            events.append(
                {
                    "id": i + 1,
                    "type": kind,
                    "message": template.format(n=_rng.randint(1, 4)),
                    "time": (now - timedelta(minutes=_rng.randint(1, 90))).isoformat(),
                }
            )
        events.sort(key=lambda e: e["time"], reverse=True)
        _events_cache = events
    return _events_cache[:limit]


def get_services() -> list[dict]:
    out = []
    for s in _SERVICES:
        running = s["desired"]
        # Rare, deterministic-looking blip so the UI isn't always "all green".
        degraded = _rng.random() < 0.06
        if degraded:
            running = max(0, running - 1)
        out.append(
            {
                "name": s["name"],
                "status": "healthy" if running == s["desired"] else "degraded",
                "podsRunning": running,
                "podsDesired": s["desired"],
                "uptimePercent": 99.9 if running == s["desired"] else 97.4,
            }
        )
    return out


def _wave(t: float, period: float) -> float:
    return math.sin(2 * math.pi * t / period)


def _pseudo(seed: float) -> float:
    """Deterministic 0..1 'random' value from a float seed, for smooth curves."""
    frac = math.modf(math.sin(seed) * 43758.5453)[0]
    return abs(frac)


def _clamp(v: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, v))

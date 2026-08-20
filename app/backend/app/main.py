from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, stats, events, services

app = FastAPI(
    title="DevOpsPulse API",
    description="Infrastructure & Kubernetes monitoring dashboard backend.",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# CORS is wide open for local/dev use. Tighten this once the frontend
# has a fixed origin (e.g. behind the Ingress host).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(stats.router, prefix="/api", tags=["stats"])
app.include_router(events.router, prefix="/api", tags=["events"])
app.include_router(services.router, prefix="/api", tags=["services"])


@app.get("/")
def root():
    return {"service": "devopspulse-backend", "status": "ok", "docs": "/api/docs"}

# DevOpsPulse — app/

Infrastructure & Kubernetes monitoring dashboard. Two services:

- **backend/** — FastAPI, exposes `/api/health`, `/api/stats`, `/api/stats/history`,
  `/api/events`, `/api/services`. Data is simulated for now (see
  `app/services/simulator.py`) — that's the one file to swap out later for
  real EKS/Kubernetes API or Prometheus data.
- **frontend/** — React + Vite dashboard: stat cards, a CPU/memory chart, a
  live events feed, and a services table. Polls the backend every 5s.

## Run locally (no Docker)

```bash
# backend
cd app/backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# -> http://localhost:8000/api/docs

# frontend (separate terminal)
cd app/frontend
cp .env.example .env   # VITE_API_BASE_URL=http://localhost:8000/api
npm install
npm run dev
# -> http://localhost:5173
```

## Run with Docker

```bash
docker build -t devopspulse-backend ./app/backend
docker build -t devopspulse-frontend ./app/frontend

docker network create devopspulse

docker run -d --name backend --network devopspulse -p 8000:8000 devopspulse-backend
docker run -d --name frontend --network devopspulse -p 8080:8080 \
  devopspulse-frontend
```

The frontend image is a static build — its `VITE_API_BASE_URL` is baked in
at build time. For local Docker testing rebuild with
`--build-arg`-style overrides if you need it pointed at a different backend
host, or just serve both behind the same Ingress path (`/api`) once we're in
Kubernetes, so the default `/api` base URL just works.

## Next steps

1. Push both images to the ECR repos from `modules/ecr`.
2. Write `kubernetes/{frontend,backend}/{deployment,service}.yaml` and an
   `ingress/ingress.yaml` that path-routes `/api` to the backend and `/` to
   the frontend.
3. Swap `simulator.py` for real data once the backend has an in-cluster
   ServiceAccount with permission to read node/pod metrics.

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health():
    """Used by Kubernetes liveness/readiness probes later on."""
    return {"status": "healthy", "service": "backend", "version": "1.0.0"}

from fastapi import APIRouter, Query

from app.services import simulator

router = APIRouter()


@router.get("/stats")
def stats():
    return simulator.get_stats()


@router.get("/stats/history")
def stats_history(points: int = Query(20, ge=2, le=100)):
    return simulator.get_history(points=points)

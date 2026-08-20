from fastapi import APIRouter, Query

from app.services import simulator

router = APIRouter()


@router.get("/events")
def events(limit: int = Query(8, ge=1, le=50)):
    return simulator.get_events(limit=limit)

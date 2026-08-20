from fastapi import APIRouter

from app.services import simulator

router = APIRouter()


@router.get("/services")
def services():
    return simulator.get_services()

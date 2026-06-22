from fastapi import APIRouter, Depends
from schemas import EvaluateRequest, EvaluateResponse
import auth_utils

router = APIRouter()


@router.post("/evaluate", response_model=EvaluateResponse)
def evaluate_resume(
    request: EvaluateRequest, 
    current_user: str = Depends(auth_utils.get_current_user)
):
    return EvaluateResponse(
        result=f"Evaluation requested by {current_user}. ChatGPT integration coming in Stage 5!"
    )
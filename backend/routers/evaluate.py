from fastapi import APIRouter, Depends, UploadFile, File, Form
from schemas import EvaluateResponse
# استيراد auth_utils إذا كنتِ ستعيدين تفعيل المصادقة لاحقاً

router = APIRouter()

@router.post("/", response_model=EvaluateResponse)
async def evaluate_resume(
    job_description: str = Form(...),
    prompt: str = Form(""),
    file: UploadFile = File(...)
):
    
    return EvaluateResponse(
        result="File received successfully! Integration ready."
    )
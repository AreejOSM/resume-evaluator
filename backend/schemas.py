from pydantic import BaseModel, Field, EmailStr

# طلب التسجيل
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters long")

# طلب تسجيل الدخول
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# استجابة بيانات المستخدم 
class UserResponse(BaseModel):
    email: EmailStr
    role: str = "user"

# استجابة التوكن الخاص بالأمان
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# طلب تقييم السيرة الذاتية
class EvaluateRequest(BaseModel):
    job_description: str
    prompt: str = ""

# استجابة التقييم
class EvaluateResponse(BaseModel):
    result: str
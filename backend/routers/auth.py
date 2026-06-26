from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from database import get_session
from models import User
from schemas import RegisterRequest, UserResponse, TokenResponse
from auth_utils import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, session: Session = Depends(get_session)):
    # التحقق من أن الحساب غير مسجل مسبقاً في قاعدة البيانات
    existing_user = session.exec(select(User).where(User.email == payload.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # تشفير الباسورد وحفظ المستخدم الجديد
    hashed = hash_password(payload.password)
    new_user = User(email=payload.email, hashed_password=hashed)
    
    session.add(new_user)
    session.commit() # حفظ في قاعدة البيانات بشكل دائم
    session.refresh(new_user) # جلب الـ ID التلقائي من الداتابيز
    
    return UserResponse(email=new_user.email, role=new_user.role)

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    # 1. البحث عن المستخدم
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    
    # 2. التحقق من كلمة المرور
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # 3. إنشاء التوكن
    token = create_access_token(data={"sub": user.email})
    
    # 4. إرجاع الاستجابة متضمنة الـ role
    return TokenResponse(
        access_token=token, 
        token_type="bearer", 
        role=user.role  # هذا هو التعديل الأساسي
    )
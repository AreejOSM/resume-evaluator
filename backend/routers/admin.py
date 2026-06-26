from fastapi import APIRouter, Depends, status
from sqlmodel import Session, select
from database import get_session
from models import User
from schemas import UserResponse
from auth_utils import require_admin
from pydantic import BaseModel

router = APIRouter()

class UpdateRoleRequest(BaseModel):
    role: str

@router.get("/users", response_model=list[UserResponse])
def list_users(session: Session = Depends(get_session), admin: User = Depends(require_admin)):
    # جلب جميع المستخدمين من الداتابيز
    users = session.exec(select(User)).all()
    return [UserResponse(email=u.email, role=u.role) for u in users]

@router.patch("/users/{email}/role", response_model=UserResponse)
def update_user_role(email: str, payload: UpdateRoleRequest, session: Session = Depends(get_session), admin: User = Depends(require_admin)):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="User not found")
    
    user.role = payload.role
    session.add(user)
    session.commit()
    session.refresh(user)
    return UserResponse(email=user.email, role=user.role)

@router.delete("/users/{email}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(email: str, session: Session = Depends(get_session), admin: User = Depends(require_admin)):
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="User not found")
    
    session.delete(user)
    session.commit()
    return None
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas import RegisterRequest, UserResponse, TokenResponse
import store
import auth_utils

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(request: RegisterRequest):
    if request.email in store.users:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_pwd = auth_utils.hash_password(request.password)
    
    store.users[request.email] = {
        "email": request.email,
        "hashed_password": hashed_pwd,
        "role": "user"
    }
    return UserResponse(email=request.email, role="user")

@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = store.users.get(form_data.username)
    
    if not user or not auth_utils.verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token = auth_utils.create_access_token(data={"sub": form_data.username})
    return TokenResponse(access_token=access_token, token_type="bearer")

@router.get("/me", response_model=UserResponse)
def get_me(current_user: str = Depends(auth_utils.get_current_user)):
    user = store.users.get(current_user)
    return UserResponse(email=user["email"], role=user["role"])
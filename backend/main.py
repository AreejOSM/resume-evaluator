from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, evaluate, admin 
from database import create_db

app = FastAPI(title="Resume Evaluator API")

@app.on_event("startup")
def on_startup():
    create_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(evaluate.router, prefix="/evaluate", tags=["Evaluation Pipeline"])
app.include_router(admin.router, prefix="/admin", tags=["Admin Control Panel"]) 

@app.get("/")
def root():
    return {"message": "Welcome to Resume Evaluator Backend! All systems operational."}
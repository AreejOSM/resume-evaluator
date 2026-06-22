from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, evaluate

app = FastAPI(title="Resume Evaluator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(evaluate.router, prefix="/evaluate", tags=["Evaluation Pipeline"])

@app.get("/")
def root():
    return {"message": "Welcome to Resume Evaluator Backend! All systems operational."}
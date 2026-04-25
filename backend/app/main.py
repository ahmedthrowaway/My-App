from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from .database import create_db_and_tables, get_session
from .models import Survey, SurveyCreate, SurveyRead, SurveyUpdate

app = FastAPI(
    title="Student Survey API",
    description="Minimal FastAPI + SQLModel backend for SWE 645 Assignment 3",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite React dev server
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SessionDep = Annotated[Session, Depends(get_session)]


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def root():
    return {"message": "Student Survey API is running"}


@app.post("/surveys", response_model=SurveyRead, status_code=201)
def create_survey(survey: SurveyCreate, session: SessionDep):
    db_survey = Survey.model_validate(survey)
    session.add(db_survey)
    session.commit()
    session.refresh(db_survey)
    return db_survey


@app.get("/surveys", response_model=list[SurveyRead])
def read_surveys(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    surveys = session.exec(select(Survey).offset(offset).limit(limit)).all()
    return surveys


@app.get("/surveys/{survey_id}", response_model=SurveyRead)
def read_survey(survey_id: int, session: SessionDep):
    survey = session.get(Survey, survey_id)
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")
    return survey


@app.put("/surveys/{survey_id}", response_model=SurveyRead)
def update_survey(survey_id: int, survey_update: SurveyUpdate, session: SessionDep):
    survey = session.get(Survey, survey_id)
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    update_data = survey_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(survey, key, value)

    session.add(survey)
    session.commit()
    session.refresh(survey)
    return survey


@app.delete("/surveys/{survey_id}")
def delete_survey(survey_id: int, session: SessionDep):
    survey = session.get(Survey, survey_id)
    if not survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    session.delete(survey)
    session.commit()
    return {"message": f"Survey {survey_id} deleted successfully"}

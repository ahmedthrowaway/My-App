# Assignment 3 by Ahmed A - SWE645 - Spring 2026 - python sql model file
from typing import Optional
from sqlmodel import Field, SQLModel


class SurveyBase(SQLModel):
    first_name: str
    last_name: str
    street_address: str
    city: str
    state: str
    zip_code: str
    telephone: str
    email: str
    survey_date: str
    # Store checkbox selections as a comma-separated string for simplicity.
    liked_most: str = ""
    interest_source: str
    recommendation: str
    raffle_numbers: str
    comments: str = ""


class Survey(SurveyBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class SurveyCreate(SurveyBase):
    pass


class SurveyUpdate(SQLModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    street_address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    telephone: Optional[str] = None
    email: Optional[str] = None
    survey_date: Optional[str] = None
    liked_most: Optional[str] = None
    interest_source: Optional[str] = None
    recommendation: Optional[str] = None
    raffle_numbers: Optional[str] = None
    comments: Optional[str] = None


class SurveyRead(SurveyBase):
    id: int

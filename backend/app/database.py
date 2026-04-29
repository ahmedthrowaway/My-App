# Assignment 3 by Ahmed A - SWE645 - Spring 2026 - python file to handle database (uses sqlite)
import os
from sqlmodel import SQLModel, Session, create_engine

# Default: SQLite for easy local development.
# To switch to MySQL later, set an environment variable, for example:
# DATABASE_URL="mysql+pymysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./surveys.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, echo=False, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session

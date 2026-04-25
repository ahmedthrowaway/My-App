BACKEND MINIMAL SETUP
=====================

Quick start (from the backend_minimal folder):

1) Create a virtual environment
   python -m venv .venv

2) Activate it
   Windows PowerShell:
     .venv\Scripts\Activate.ps1
   macOS/Linux:
     source .venv/bin/activate

3) Install dependencies
   pip install -r requirements.txt

4) Run the API server
   uvicorn app.main:app --reload

5) Open docs
   http://127.0.0.1:8000/docs

SQLite is used by default and will create surveys.db automatically.

To switch to MySQL later, set DATABASE_URL before starting the app, for example:
   Windows PowerShell:
     $env:DATABASE_URL="mysql+pymysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME"
   macOS/Linux:
     export DATABASE_URL="mysql+pymysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME"

Then run:
   uvicorn app.main:app --reload

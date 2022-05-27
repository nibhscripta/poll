# poll
## Running the application:
### Backend
1. Navigate to the backend directory and run `python3 -r requirements.txt`
2. Run the server `uvicorn api.main:app --reload`
### Configure migrations
1. Provision an sql database. This project uses psycopg2 Postgres drivers
2. Set up environment variables with the variable names found in /api/settings.py
3. Run migrations:

- Generate tables with alembic: `alembic revision --autogenerate -m "Autogenerate database tables"`
- Exexecute the changes on the database: `alembic upgrade head`
### Frontend
1. Navigate to frontend directory
2. In web directory run `npm i dependencies`
3. Run the frontend with `npm start`
4. Build the frontend with `npm build`

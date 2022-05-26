# poll
## Running the application:
### Backend
1. Navigate to the backend directory and run `python3 -r requirements.txt`
2. Run the server `uvicorn api.main:app --reload`
### Configure migrations
1. Provision an sql database.
2. Set up environment variables found in /api/settings.py
3. Run migrations:

`alembic revision --autogenerate -m "Autogenerate database tables"`

`alembic upgrade head`
### Frontend
1. Navigate to frontend directory
2. In web directory run `npm i dependencies`
3. Run the frontend with `npm start`
4. Build the frontend with `npm build`

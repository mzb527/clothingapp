Inventory Management System
A full-stack application for managing product SKUs in a store or warehouse.
Built with a Flask backend (REST API, JWT authentication, role-based access) and a React frontend (Axios, React Query, React Router, Context API).
Features
- SKU CRUD with dynamic search, filtering, sorting, and pagination
- JWT-based login endpoint (/api/auth/login)
- Role-based permissions (manager vs. clerk)
- Centralized configuration via .env files
- Single Axios instance for all HTTP calls
- Protected routes in React using a PrivateRoute component
Tech Stack
- Backend: Python 3.9+, Flask, Flask-JWT-Extended, SQLAlchemy, python-dotenv
- Frontend: Node.js 16+, React, React Query, Axios, React Router
- Database: PostgreSQL (or any SQLAlchemy-compatible DB)
Prerequisites
- Python 3.9 or newer
- Node.js 16 or newer
- PostgreSQL (or your database of choice)
Installation
1. Clone the repository
git clone https://github.com/your-org/inventory-system.git
cd inventory-system


2. Backend setup
cd backend
python -m venv venv
source venv/bin/activate       # on Windows: venv\Scripts\activate
pip install -r requirements.txt


- Copy .env.example to .env and fill in your values
- Initialize the database (assuming Flask-Migrate is configured):
flask db init
flask db migrate
flask db upgrade


3. Frontend setup
cd ../frontend
cp .env.example .env
npm install


Environment Variables
Backend (backend/.env)
FLASK_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/inventory_db
JWT_SECRET_KEY=your-jwt-secret
JWT_ACCESS_TOKEN_EXPIRES=3600


Frontend (frontend/.env)
REACT_APP_API_URL=http://localhost:5000/api


Running Locally
Start the backend
cd backend
source venv/bin/activate
flask run


Start the frontend
cd frontend
npm start


Frontend will open at http://localhost:3000 by default.
API Endpoints
Authentication
- POST /api/auth/login
Request: { username, password }
Response: { access_token, user: { id, username, role } }
SKUs
All /api/skus routes require a valid JWT in Authorization: Bearer <token>.
- GET /api/skus — list with query params: q, page, per_page, sort_by, order, <filters>
- POST /api/skus — create (manager only)
- PUT /api/skus/<id> — update (manager only)
- DELETE /api/skus/<id> — delete (manager only)
Project Structure
backend/
  app/
    api/
      auth.py
      inventory.py
    config.py
    extensions.py
    models.py
    __init__.py
  .env
  requirements.txt

frontend/
  src/
    config.js
    services/
      api.js
      auth.js
      inventory.js
    context/
      AuthContext.jsx
    hooks/
      useAuth.js
      useSkus.js
      useFilters.js
    features/
      auth/
        pages/LoginPage.jsx
      inventory/
        components/
          SearchBar.jsx
          FilterPanel.jsx
          SortDropdown.jsx
          SKUCard.jsx
          SKUList.jsx
        pages/InventoryPage.jsx
    routes/PrivateRoute.jsx
    app/App.jsx
  .env
  package.json


Testing
- Backend unit tests with pytest
- Frontend unit tests with Jest & React Testing Library
- End-to-end tests with Cypress
Future Improvements
- Bulk CSV import/export
- Real-time stock updates via WebSocket/SSE
- Audit log and detailed reporting
- Offline support with service workers

Feel free to contribute fixes or features by opening a pull request.

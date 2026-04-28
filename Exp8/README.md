# Exp8 — React + Spring Boot Integration (Axios, CORS, JWT)

This practical demonstrates:

1. **Public GET API call from React** and rendering response in a table.
2. **Form submission handling** (register + product creation) with success/error messages from backend response codes.
3. **Proper CORS + JWT-protected APIs** with token attached via Axios interceptor and redirect to login on unauthorized responses.

## Project Structure

- `backend/` — Spring Boot API
- `frontend/` — React + Vite app

## Run Backend

```bash
cd backend
./mvnw spring-boot:run
```

If `mvnw` is unavailable locally, use:

```bash
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Demo Flow

1. Open frontend and view public products table (public GET endpoint).
2. Register a new user.
3. Login to receive JWT.
4. Open dashboard and create a product (protected POST).
5. Protected GET/POST calls send JWT automatically.
6. If token is invalid/expired, user is redirected to login.

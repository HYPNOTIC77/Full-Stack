# Exp9 - Dockerized Full-Stack App (Spring Boot + React + PostgreSQL)

This folder contains a complete full-stack application that satisfies the assignment requirements:

1. Spring Boot backend Dockerized with JAR build and runtime.
2. React frontend Dockerized with production build served by Nginx.
3. Docker Compose orchestration for frontend, backend, and PostgreSQL database with networking and environment variables.

## Project structure

```text
Exp9/
├─ backend/      # Spring Boot API
├─ frontend/     # React + Vite app served by Nginx
├─ docker-compose.yml
└─ .env.example
```

## Quick start

1. Copy env file:
   - `cp .env.example .env`
2. Start all services:
   - `docker compose up --build`
3. Open in browser:
   - Frontend: http://localhost:3000
   - Backend health API: http://localhost:8080/api/health

## Service overview

- **Database (`db`)**: PostgreSQL 16, persistent volume `pgdata`
- **Backend (`backend`)**: Spring Boot app on port `8080`
- **Frontend (`frontend`)**: Nginx serving production React build on host port `3000`

## API endpoints

- `GET /api/health`
- `GET /api/todos`
- `POST /api/todos` with body `{ "title": "task" }`
- `PATCH /api/todos/{id}/toggle`
- `DELETE /api/todos/{id}`

## Verify full stack in browser

1. Open `http://localhost:3000`.
2. You should see **Backend: UP** status.
3. Add, toggle, and delete todo items from the UI.

If the backend status is not UP, wait a few seconds for DB and backend startup, then refresh.
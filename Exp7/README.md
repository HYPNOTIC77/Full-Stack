# Exp7 - Spring Security JWT + RBAC

This project implements:

1. **Login endpoint** that authenticates user credentials and returns a JWT.
2. **JWT validation filter** that secures protected endpoints while allowing public routes.
3. **Role-based access control (RBAC)** using both `@Secured` and `@PreAuthorize`.

## Tech stack

- Java 17
- Spring Boot 3
- Spring Security
- JJWT (JSON Web Token)
- JUnit + MockMvc

## Default users (hardcoded in-memory)

- `admin / admin123` -> roles: `ADMIN`, `USER`
- `user / user123` -> role: `USER`

## API endpoints

### Public

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/public/health`

### Protected

- `GET /api/user/profile` -> requires `ROLE_USER` or `ROLE_ADMIN` (`@Secured`)
- `GET /api/admin/dashboard` -> requires `ROLE_ADMIN` (`@PreAuthorize`)

## Run

```bash
mvn spring-boot:run
```

## Test

```bash
mvn test
```

## Sample request payloads

### Login

```json
{
  "username": "user",
  "password": "user123"
}
```

### Register

```json
{
  "username": "newuser",
  "password": "password123",
  "role": "USER"
}
```
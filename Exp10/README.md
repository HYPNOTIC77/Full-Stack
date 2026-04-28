# Exp10 — Full CI/CD Architecture (React + Spring Boot + GitHub Actions + AWS EC2 + Firebase)

This experiment now includes a **complete runnable full-stack project** and a CI/CD pipeline that matches all requirements from the assignment prompt.

## What’s implemented

1. **CI workflow on every push / PR**
   - Frontend: `npm test`, `npm run build`
   - Backend: `mvn test`, `mvn package`
2. **Build artifacts + image pipeline**
   - Uploads frontend `dist/` artifact
   - Uploads backend JAR artifact
   - Builds/pushes Docker images to GHCR on `main`
3. **CD workflow on `main`**
   - Deploy backend Docker image to **AWS EC2** over SSH
   - Deploy frontend to **Firebase Hosting**
   - Optional custom-domain attach/update for Firebase Hosting

## Project structure

```text
Exp10/
├─ .github/workflows/
│  ├─ ci.yml
│  └─ cd.yml
├─ backend/
│  ├─ pom.xml
│  ├─ Dockerfile
│  └─ src/
├─ frontend/
│  ├─ package.json
│  ├─ Dockerfile
│  ├─ firebase.json
│  └─ src/
├─ scripts/
│  ├─ deploy-backend-ec2.sh
│  └─ update-firebase-domain.sh
├─ .env.example
└─ README.md
```

## GitHub Actions workflows

- `ci.yml`
  - Trigger: push (all branches), pull request
  - Jobs:
    - `frontend-test-build`
    - `backend-test-build`
    - `docker-publish` (main branch only)

- `cd.yml`
  - Trigger: push to `main`, manual dispatch
  - Jobs:
    - `deploy-backend-ec2`
    - `deploy-frontend-firebase`
    - `update-custom-domain` (optional)

## Required GitHub secrets

Copy from `.env.example` and set these under repository Actions secrets:

### Backend → EC2
- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`

### Firebase deploy
- `FIREBASE_SERVICE_ACCOUNT`
- `FIREBASE_PROJECT_ID`

### Optional custom-domain automation
- `FIREBASE_ACCESS_TOKEN`
- `FIREBASE_SITE_ID`
- `FIREBASE_CUSTOM_DOMAIN`

## Local verification

### Frontend

```bash
cd Exp10/frontend
npm install
npm test
npm run build
```

### Backend

```bash
cd Exp10/backend
mvn test
mvn -DskipTests package
```

## Important note about workflow location

GitHub only executes workflows from the repository root `.github/workflows/` path.

If your assignment expects real GitHub execution, copy:

- `Exp10/.github/workflows/ci.yml` → `<repo-root>/.github/workflows/ci.yml`
- `Exp10/.github/workflows/cd.yml` → `<repo-root>/.github/workflows/cd.yml`

## Requirement mapping

- **(a) Push-triggered test/build workflow** → ✅ Implemented in `ci.yml`
- **(b) Artifacts + optional Docker image publish** → ✅ Implemented in `ci.yml`
- **(c) Full CI/CD (EC2 + Firebase + optional custom domain)** → ✅ Implemented in `cd.yml` + scripts

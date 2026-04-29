# Assignment 3 by Ahmed A - SWE645 - Spring 2026 - Dockerfile to create two docker images: front end and for back end
# =========================
# FRONTEND BUILD STAGE
# =========================
FROM node:20-alpine AS frontend-build

WORKDIR /app

COPY frontend/package.json ./
COPY frontend/vite.config.js ./
COPY frontend/index.html ./
COPY frontend/src ./src

RUN npm install
RUN npm run build

# =========================
# FRONTEND RUNTIME IMAGE
# =========================
FROM nginx:alpine AS frontend

COPY --from=frontend-build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# =========================
# BACKEND IMAGE
# =========================
FROM python:3.12-slim AS backend

WORKDIR /app

COPY backend/requirements.txt ./

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY backend/app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

#Ahmed A - SWE645 - Spring 2026 - This is the Dockerfile to containerize the web application for Assignment 3

FROM node:20-alpine AS build

WORKDIR /app

COPY frontend/ ./

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
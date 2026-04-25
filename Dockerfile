#Ahmed A - SWE645 - Spring 2026 - This is the Dockerfile to containerize the web application for Assignment 2

FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY survey.html /usr/share/nginx/html/

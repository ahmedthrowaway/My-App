FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY survey.html /usr/share/nginx/html/
COPY blackhole.png /usr/share/nginx/html/

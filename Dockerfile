FROM nginx:stable-alpine-slim

COPY ./dist /usr/share/nginx/html

EXPOSE 80
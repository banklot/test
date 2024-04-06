FROM node:20.12-alpine AS FRONTEND

RUN apk add tzdata
RUN ln -snf /usr/share/zoneinfo/America/Caracas /etc/localtime && echo America/Caracas > /etc/timezone
WORKDIR /app
COPY . /app
RUN yarn

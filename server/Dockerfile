FROM node:18-alpine

RUN apk update
RUN apk add make gcc g++
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

COPY package*.json /app/

WORKDIR /app

RUN npm install

COPY . /app/

RUN npx prisma generate

CMD ["node","app.js"]
FROM node:14.17.4
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
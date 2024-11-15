FROM node:20-alpine AS build

WORKDIR /

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .
RUN npm run build
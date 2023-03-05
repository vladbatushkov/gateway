FROM node:18-alpine AS build
WORKDIR /app
COPY ./*.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY ./src ./
COPY ./public ./
CMD ["npm", "start"]

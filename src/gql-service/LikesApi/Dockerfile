FROM node:18-alpine as base
EXPOSE 4000
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY ./index.js .
ENTRYPOINT ["node", "index.js"]
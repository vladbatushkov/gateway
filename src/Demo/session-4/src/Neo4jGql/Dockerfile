FROM node:18-alpine as base
EXPOSE 4000
WORKDIR /src
COPY ["src/Neo4jGql/package*.json", "."]
RUN npm install
ENV NODE_ENV=development
COPY src/Neo4jGql .
ENTRYPOINT ["node", "index.js"]


# GraphQL + Neo4j

## Step 1: Setup Project

- Open fodler `/workspace`. Create a new folder `LikesApi` and init a Node.js project.

```sh
mkdir LikesApi && cd LikesApi
npm init --yes
```

- Open folder `/LikesApi` and install all required dependencies.

```sh
npm install @neo4j/graphql graphql neo4j-driver apollo-server
```

- Add `.gitignore` file.

```sh
node_modules
```

## Step 2: GraphQL Server

- Create file `index.js`.

```js
// index.js
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
  type Technology {
    name: String! @id(autogenerate: false, unique: true)
    persons: [Person!]! @relationship(type: "LIKE", direction: IN)
  }

  type Person {
    name: String! @id(autogenerate: false, unique: true)
    technologies: [Technology!]! @relationship(type: "LIKE", direction: OUT)
  }
`;

const driver = neo4j.driver(
  "neo4j+s://d71b6287.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "<password>")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({
    schema,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 GraphQL server ready at ${url}`);
  });
});
```

> Note: Don't forget to replace `<password>` with an actual password from our secret chat.

- Start the app.

```sh
node index.js
```

- Open [http://localhost:4000/](http://localhost:4000/).

## Step 4: Docker

- Create `Dockerfile` inside project root folder.

```dockerfile
FROM node:18-alpine as base
EXPOSE 4000
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY ./index.js .
ENTRYPOINT ["node", "index.js"]
```

- Update `docker-compose.yml` file inside a `/workspace` folder. (One level up to the project root folder).

- Adding one more service.

```yml
version: "3.6"

services:
  # WEBAPI MONGODB
  # ...
  # GRAPHQL NEO4J
  likesapi:
    image: likesapi
    build:
      context: ./LikesApi
      dockerfile: ./Dockerfile
    ports:
      - "4000:4000"
    expose:
      - "4000"
```

- Start services using docker compose.

```sh
docker-compose up
```

###### Refs

- https://neo4j.com/developer/graphql/
- https://neo4j.com/docs/graphql-manual/current/getting-started/

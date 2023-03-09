# GraphQL + Neo4j

## Step 1: Setup Project

- Create a new folder `/LikesApi` and init a Node.js project.

```sh
mkdir LikesApi && cd LikesApi
npm init --yes
```

- Open folder `/LikesApi` and install all required dependencies.

```sh
npm install @neo4j/graphql graphql neo4j-driver apollo-server
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
    users: [User!]! @relationship(type: "LIKE", direction: IN)
  }

  type User {
    account: String! @id(autogenerate: false, unique: true)
    name: String!
    image: String!
    bio: String!
    technologies: [Technology!]! @relationship(type: "LIKE", direction: OUT)
  }

  type Subscription {
    userAdded: User!
  }
`;

const driver = neo4j.driver("<host>", neo4j.auth.basic("<user>", "<password>"));

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

> Note: Don't forget to replace connection values with an actual credentials from our secret chat.

- Start the app.

```sh
node index.js
```

- Open [http://localhost:4000/](http://localhost:4000/).

## Step 4: Dockerize (Optional)

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

- Update `docker-compose.yml` file by adding one more service.

```yml
version: "3.6"

services:
  # GRAPHQL GATEWAY API - been created already
  # ...
  # WEBAPI MONGODB - been created already
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

- Start containers again.

```sh
docker-compose up --build
```

## Step 5: Open Neo4j Database using Neo4j Browser (Optional)

- Add Neo4j into `docker-compose.yml` file.

```yml
version: "3.6"

services:
  # GRAPHQL GATEWAY API - been created already
  # ...
  # WEBAPI MONGODB - been created already
  # ...
  # GRAPHQL NEO4J - been created already
  # ...
  # NEO4J
  neo4j:
    image: neo4j:5.5.0
    restart: unless-stopped
    ports:
      - "7474:7474"
```

- Start containers again.

```sh
docker-compose up
```

- Open Neo4j Browser [http://localhost:7474/](http://localhost:7474/).

- Connect to could instance of Neo4j Database using credentials from our secret chat.
  - Host: `<neo4j.host>`
  - User: `<neo4j.user>`
  - Passowrd: `<neo4j.password>`

###### Refs

- https://neo4j.com/developer/graphql/
- https://neo4j.com/docs/graphql-manual/current/getting-started/

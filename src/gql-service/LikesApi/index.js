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

  }
`;

const driver = neo4j.driver(
  "neo4j+s://d71b6287.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "a0mQyTDJ13EyOaqPiqHEIYnf6CDvkk_ngRKrN68c2NI")
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

const { gql, ApolloServer } = require("apollo-server");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
require("dotenv").config();

const typeDefs = gql`
type Technology {
    name: String! @id(autogenerate: false, unique: true)
    users: [User!]! @relationship(type: "LIKE", direction: IN)
  }

  type User {
    name: String! @id(autogenerate: false, unique: true)
    technologies: [Technology!]! @relationship(type: "LIKE", direction: OUT)
  }

  type Subscription {
    userAdded(name: String!): User
  }
`;

const startup = () => {
  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
  );

  const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

  neoSchema.getSchema().then((schema) => {
      const server = new ApolloServer({
          schema: schema
      });

      server.listen().then(({ url }) => {
          console.log(`GraphQL server ready on ${url}`);
      });
  });
}

setTimeout(startup, 5000);
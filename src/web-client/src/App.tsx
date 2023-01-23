import "./App.css";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { Tags } from "./components/Tags";
import { TagsWithInput } from "./components/TagsWithInput";
import { TagsWithInputWithSub } from "./components/TagsWithInputWithSub";
import { TagsWithInputWithSubWithChecks } from "./components/TagsWithInputWithSubWithChecks";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { Admin } from "./components/Admin";
import { Grid } from "./components/Grid";

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
});

const link = new WebSocketLink(
  new SubscriptionClient("ws://localhost:5000/graphql", {
    reconnect: true,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  link,
  httpLink
);

const client = new ApolloClient({
  uri: "http://localhost:5126/graphql",
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-quarter">
              <Admin />
            </div>
            <div className="column">
              <Grid />
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;

import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { AppContainer } from "./components/AppContainer";
import { AppProvider } from "./AppContext";

const httpLink = new HttpLink({
  uri: "http://localhost:5050/graphql",
});

const link = new WebSocketLink(
  new SubscriptionClient("ws://localhost:5050/graphql", {
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
  uri: "http://localhost:5050/graphql",
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <AppContainer />
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;

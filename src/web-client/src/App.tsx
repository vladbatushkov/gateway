import './App.css';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { LastAddedTag } from './components/LastAddedTag';
import { Tags } from './components/Tags';
import { AddTag } from './components/AddTag';

// const httpLink = new HttpLink({
//   uri: 'http://localhost:5126/graphql'
// });

// const wsLink = new GraphQLWsLink(createClient({
//   url: () => 'ws://localhost:5126/graphql',
// }));

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

const client = new ApolloClient({
  uri: 'http://localhost:5126/graphql',
  //link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          {/* <LastAddedTag /> */}
          <AddTag/>
          <Tags />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;

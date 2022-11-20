import './App.css';
import React from 'react';
import { Tags } from './components/Tags';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5126/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Tags />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;

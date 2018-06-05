import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import PostList from './components/PostList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1 className="header">Welcome to React-GraphQL-NodeJS starter project!</h1>
          <PostList />
        </div>
      </ApolloProvider>
    );
  }
}
export default App;

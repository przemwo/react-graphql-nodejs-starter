import React, { Component } from 'react';

import './App.css';
import PostList from './components/PostList';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="header">Welcome to React-GraphQL-NodeJS starter project!</h1>
        <PostList />
      </div>
    );
  }
}
export default App;

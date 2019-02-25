import React, { Component } from 'react';
import UsersList from './components/users-list'
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Users</h1>
          <UsersList />
      </div>
    );
  }
}

export default App;

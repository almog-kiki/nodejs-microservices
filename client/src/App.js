import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/userList'
import ArtistsList from './components/artistsList'
import Search from './components/search'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="content-container">
        <UserList></UserList>
        <ArtistsList></ArtistsList>
        <Search></Search>
      </div>
    </div>
  );
}

export default App;

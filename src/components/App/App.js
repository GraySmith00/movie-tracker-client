import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import { getNowPlaying } from '../../helpers.js';

import './App.css';

class App extends Component {
  async componentDidMount() {
    const nowPlaying = await getNowPlaying();
    console.log(nowPlaying);
  }

  render() {
    const navigationLink = ['Now Playing', 'Favorites', 'Movies with Pauls'];
    const displayLinks = navigationLink.map(link => (
      <NavLink className="nav-button" name={link} exact to={`/${link}`}>
        {link}
      </NavLink>
    ));
    return (
      <div className="App">
        <h1>App</h1>
        {displayLinks}
      </div>
    );
  }
}

export default App;

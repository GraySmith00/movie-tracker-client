import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { getNowPlaying, populateSearch } from '../../helpers.js';

import { addNowPlaying, clearFavorites } from '../../actions/movieActions';
import './App.css';
import { setCurrentUser } from '../../actions/userActions.js';
import { NavBar } from '../NavBar/NavBar';
import { Routes } from '../NavBar/Routes';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: ''
    };
  }

  async componentDidMount() {
    const nowPlaying = await getNowPlaying();
    this.props.addNowPlaying(nowPlaying);
    // const search = await populateSearch('paul');
  }

  handleClick = event => {
    const { name } = event.target;
    this.setState({ activeTab: name });
  };

  logoutUser = () => {
    const { setCurrentUser, clearFavorites } = this.props;
    setCurrentUser(null);
    clearFavorites();
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header>
              <NavBar logoutUser={this.logoutUser} />
            </header>
            <main>
              <h1>App</h1>
              <Routes />
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNowPlaying: movies => dispatch(addNowPlaying(movies)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearFavorites: () => dispatch(clearFavorites())
});

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

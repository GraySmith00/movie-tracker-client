import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { getNowPlaying } from '../../helpers/apiCalls.js';

import { addNowPlaying, clearFavorites } from '../../actions/movieActions';
import './App.css';
import { setCurrentUser } from '../../actions/userActions.js';
import Navigation from '../Navigation/Navigation';
import Routes from '../Routes/Routes';

export class App extends Component {
  async componentDidMount() {
    try {
      const nowPlaying = await getNowPlaying();
      this.props.addNowPlaying(nowPlaying);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header>
              <Navigation />
            </header>
            <main>
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

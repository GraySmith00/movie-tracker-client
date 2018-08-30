import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';

import { getNowPlaying, populateSearch, getFavorites } from '../../helpers.js';

import { addNowPlaying, updateFavorites } from '../../actions/movieActions';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import './App.css';
import CardContainer from '../CardContainer/CardContainer.js';
import { setCurrentUser } from '../../actions/userActions.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: ''
    };
  }

  async componentDidMount() {
    const nowPlaying = await getNowPlaying();
    this.props.addNowPlaying(nowPlaying);
  }

  handleClick = event => {
    const { name } = event.target;
    this.setState({ activeTab: name });
  };

  logoutUser = () => {
    this.props.setCurrentUser(null);
  };

  setFavoritesState = async () => {
    const { currentUser, updateFavorites } = this.props;
    if (currentUser) {
      const favorites = await getFavorites(currentUser);
      updateFavorites(favorites.data);
    }
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header>
              <nav className="nav-btns">
                <NavLink exact to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink exact to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink exact to="/register" className="nav-link">
                  Sign Up
                </NavLink>
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  onClick={this.logoutUser}
                >
                  Logout
                </NavLink>
                <NavLink exact to="/favorites" className="nav-link">
                  Favorites
                </NavLink>
              </nav>
            </header>
            <main>
              <h1>App</h1>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <CardContainer category={'nowPlaying'} />;
                  }}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route
                  exact
                  path="/favorites"
                  render={() => {
                    this.setFavoritesState();
                    return <CardContainer category={'favorites'} />;
                  }}
                />
              </Switch>
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateFavorites: favorites => dispatch(updateFavorites(favorites)),
  addNowPlaying: movies => dispatch(addNowPlaying(movies)),
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

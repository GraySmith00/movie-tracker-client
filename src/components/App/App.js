import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { getNowPlaying, populateSearch } from '../../helpers.js';

import { addNowPlaying } from '../../actions/movieActions';
import Login from '../../containers/Login/Login';
import './App.css';
import CardContainer from '../CardContainer/CardContainer.js';

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

  render() {
    const { nowPlaying, activeTab } = this.state;

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
              </Switch>
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNowPlaying: movies => dispatch(addNowPlaying(movies))
});

export default connect(
  null,
  mapDispatchToProps
)(App);

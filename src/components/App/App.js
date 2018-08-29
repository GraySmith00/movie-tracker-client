import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getNowPlaying, populateSearch } from "../../helpers.js";

import "./App.css";
import CardContainer from "../card-container/CardContainer.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: ""
    };
  }

  componentDidMount() {
    this.props.getNowPlaying();
  }

  handleClick = event => {
    const { name } = event.target;
    this.setState({ activeTab: name });
  };

  render() {
    const { nowPlaying, activeTab } = this.state;
    const navigationLink = ["NowPlaying", "Favorites", "MoviesWithPauls"];
    const displayLinks = navigationLink.map((link, index) => (
      <NavLink
        key={`${link}-${index}`}
        className="nav-bar"
        name={link}
        exact
        to={`/${link}`}
        onClick={event => this.handleClick(event)}
      >
        {link}
      </NavLink>
    ));
    return (
      <div className="App">
        <h1>App</h1>
        {displayLinks}
        <Switch>
          <Route exact path="/" />
          <Route
            exact
            path={`/${activeTab}`}
            render={({ match }) => {
              const { path } = match;
              const slicedPath = path.slice(1);
              return <CardContainer path={slicedPath} data={nowPlaying} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getNowPlaying: () => dispatch(getNowPlaying())
});

export default connect(
  null,
  mapDispatchToProps
)(App);

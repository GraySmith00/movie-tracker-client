import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCurrentUser } from '../../actions/userActions';
import { clearFavorites } from '../../actions/movieActions';

export class Navigation extends Component {
  logoutUser = () => {
    const { setCurrentUser, clearFavorites } = this.props;
    setCurrentUser(null);
    clearFavorites();
  };
  render() {
    return (
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
          className="nav-link nav-link-logout"
          onClick={this.logoutUser}
        >
          Logout
        </NavLink>
        <NavLink exact to="/favorites" className="nav-link">
          Favorites
        </NavLink>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearFavorites: () => dispatch(clearFavorites())
});

export default connect(
  null,
  mapDispatchToProps
)(Navigation);

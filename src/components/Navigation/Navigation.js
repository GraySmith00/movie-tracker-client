import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { setCurrentUser } from '../../actions/userActions';
import { clearFavorites } from '../../actions/movieActions';

import './Navigation.css';

export class Navigation extends Component {
  logoutUser = () => {
    const { setCurrentUser, clearFavorites, history } = this.props;
    setCurrentUser(null);
    clearFavorites();
    history.replace('/');
  };

  render() {
    return (
      <section className="navigation">
        <Link exact to="/" className="nav-link brand">
          <i className="fas fa-film" />
          MovieTracker
        </Link>
        <nav className="nav-btns">
          {this.props.currentUser !== null ? (
            <div>
              <NavLink exact to="/favorites" className="nav-link">
                <i className="fas fa-heart" />
                Favorites
              </NavLink>
              <Link
                exact
                to="/"
                className="nav-link nav-link-logout"
                onClick={this.logoutUser}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <NavLink
                exact
                to="/register"
                className="nav-link"
                onClick={this.checkUserStatus}
              >
                <i className="fas fa-user-plus" />
                Sign Up
              </NavLink>
              <NavLink
                exact
                to="/login"
                className="nav-link"
                onClick={this.checkUserStatus}
              >
                <i className="fas fa-sign-in-alt" />
                Login
              </NavLink>
            </div>
          )}
        </nav>
      </section>
    );
  }
}

Navigation.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  clearFavorites: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

export const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearFavorites: () => dispatch(clearFavorites())
});

export const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation)
);

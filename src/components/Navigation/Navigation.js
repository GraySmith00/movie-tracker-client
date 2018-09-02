import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { setCurrentUser } from '../../actions/userActions';
import { clearFavorites } from '../../actions/movieActions';

import './Navigation.css';

export class Navigation extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     isLoggedIn: false
  //   };
  // }

  logoutUser = () => {
    const { setCurrentUser, clearFavorites, history } = this.props;
    setCurrentUser(null);
    clearFavorites();
    history.replace('/');
  };

  // checkUserStatus = () => {
  //   if (this.props.currentUser) {
  //     this.setState({
  //       isLoggedIn: true
  //     });
  //   }
  // };

  render() {
    console.log(this.props.currentUser);
    return (
      <section className="navigation">
        <Link exact to="/" className="nav-link brand">
          <i className="fas fa-film" />
          MovieTracker
        </Link>
        <nav className="nav-btns">
          <NavLink exact to="/favorites" className="nav-link">
            <i className="fas fa-heart" />
            Favorites
          </NavLink>

          {this.props.currentUser !== null ? (
            <NavLink
              exact
              to="/"
              className="nav-link nav-link-logout"
              onClick={this.logoutUser}
            >
              Logout
            </NavLink>
          ) : (
            <div>
              <NavLink
                exact
                to="/register"
                className="nav-link"
                onClick={this.checkUserStatus}
              >
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

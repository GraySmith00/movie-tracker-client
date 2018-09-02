import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, getFavorites } from '../../helpers/apiCalls';
import { setCurrentUser } from '../../actions/userActions';
import { populateFavoritesState } from '../../actions/movieActions';
import { setLoginErrorState } from '../../actions/errorActions';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  setFavoritesState = async () => {
    const { currentUser, populateFavoritesState } = this.props;

    if (currentUser) {
      const favorites = await getFavorites(currentUser);
      const movieIds = favorites.data.map(favorite => favorite.movie_id);
      populateFavoritesState(movieIds);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { setLoginErrorState, setCurrentUser, history } = this.props;

    if (!email || !password) {
      setLoginErrorState('You are missing one of the required fields.');
      return;
    }

    try {
      const currentUser = await loginUser(email, password);
      if (!currentUser) {
        setLoginErrorState(
          'Sorry there is no user associated with this email.'
        );
        return;
      }
      if (currentUser.password !== password) {
        setLoginErrorState('Incorrect password');
        return;
      }
      setLoginErrorState('');
      setCurrentUser(currentUser);
      this.setState({
        email: '',
        password: ''
      });

      if (currentUser) {
        this.setFavoritesState();
        history.push('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <section className="login-user">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="email"
            value={this.state.email}
            placeholder="Email..."
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="password"
            value={this.state.password}
            placeholder="Password..."
          />
          <button>Submit</button>
        </form>
        <p className="error-message">{this.props.error}</p>
      </section>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  populateFavoritesState: movieIds =>
    dispatch(populateFavoritesState(movieIds)),
  setLoginErrorState: message => dispatch(setLoginErrorState(message))
});

export const mapStateToProps = state => ({
  currentUser: state.currentUser,
  error: state.errors.loginError
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

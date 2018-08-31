import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, getFavorites } from '../../helpers';
import { setCurrentUser } from '../../actions/userActions';
import { populateFavoritesState } from '../../actions/movieActions';

class Login extends Component {
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
    try {
      const currentUser = await loginUser(email, password);
      this.props.setCurrentUser(currentUser);
      this.setState({
        email: '',
        password: ''
      });

      if (currentUser) {
        this.setFavoritesState();
        this.props.history.push('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  populateFavoritesState: movieIds => dispatch(populateFavoritesState(movieIds))
});

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

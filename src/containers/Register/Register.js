import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../helpers/apiCalls';
import { setCurrentUser } from '../../actions/userActions';
import { setRegisterErrorState } from '../../actions/errorActions';
import './Register.css';

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const { setRegisterErrorState, history } = this.props;

    if (!name || !email || !password) {
      setRegisterErrorState('You are missing one or more required fields');
      return;
    }

    setRegisterErrorState('');
    try {
      const addedUser = await registerUser(this.state);

      if (!addedUser) {
        setRegisterErrorState('a user with this email address already exists');
        return;
      }

      this.setNewUserState(addedUser);

      if (addedUser) {
        history.push('/');
      }
    } catch (error) {
      setRegisterErrorState(error.message);
    }
  };

  setNewUserState = addedUser => {
    const { setCurrentUser } = this.props;
    setCurrentUser(addedUser);
    this.setState({
      name: '',
      email: '',
      password: ''
    });
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <section className="register-user">
        <form onSubmit={this.handleSubmit} className="register-form">
          <h3 className="register-title">Sign up</h3>
          <input
            onChange={this.handleChange}
            value={name}
            name="name"
            type="text"
            placeholder="First Name"
            className="register-name"
          />
          <input
            onChange={this.handleChange}
            value={email}
            name="email"
            type="text"
            placeholder="Email"
            className="register-email"
          />
          <input
            onChange={this.handleChange}
            value={password}
            name="password"
            type="text"
            placeholder="Password"
            className="register-password"
          />
          <button className="register-btn">Submit</button>
        </form>
        <p className="error-message">{this.props.error}</p>
      </section>
    );
  }
}

Register.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setRegisterErrorState: message => dispatch(setRegisterErrorState(message))
});

const mapStateToProps = state => ({
  error: state.errors.registerError
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

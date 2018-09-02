import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../helpers/apiCalls';
import { setCurrentUser } from '../../actions/userActions';
import { setRegisterErrorState } from '../../actions/errorActions';
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
    const { setCurrentUser, setRegisterErrorState, history } = this.props;

    if (!name || !email || !password) {
      setRegisterErrorState('You are missing one or more required fields');
      return;
    }

    setRegisterErrorState('');

    const user = {
      name,
      email,
      password
    };

    try {
      const addedUser = await registerUser(user);

      if (!addedUser) {
        setRegisterErrorState('a user with this email address already exists');
        return;
      }

      setCurrentUser(addedUser);
      this.setState({
        name: '',
        email: '',
        password: ''
      });

      if (addedUser) {
        history.push('/');
      }
    } catch (error) {
      setRegisterErrorState(error.message);
    }
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <section className="register-user">
        <form onSubmit={this.handleSubmit}>
          <h1>Sign up</h1>
          <input
            onChange={this.handleChange}
            value={name}
            name="name"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={this.handleChange}
            value={email}
            name="email"
            type="text"
            placeholder="email"
          />
          <input
            onChange={this.handleChange}
            value={password}
            name="password"
            type="text"
            placeholder="password"
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

const mapDispatchToProps = dispatch => ({
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

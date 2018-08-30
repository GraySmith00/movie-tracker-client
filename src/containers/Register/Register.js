import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../helpers';
import { setCurrentUser } from '../../actions/userActions';
class Register extends Component {
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
    const user = {
      name,
      email,
      password
    };
    try {
      const addedUser = await registerUser(user);
      this.props.setCurrentUser(addedUser);
      this.setState({
        name: '',
        email: '',
        password: ''
      });

      if (addedUser) {
        this.props.history.push('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { name, email, password } = this.state;

    return (
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Register);

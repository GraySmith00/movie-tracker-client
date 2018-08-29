import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      email: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {};

  render() {
    const { firstName, email, password } = this.state;

    return (
      <form>
        <h1>Sign up</h1>
        <input
          onChange={this.handleChange}
          value={firstName}
          name="firstName"
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
        <button className="register-btn" />
      </form>
    );
  }
}

export default Register;

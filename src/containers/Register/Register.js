import React, { Component } from 'react';
import { registerUser } from '../../helpers';

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

    const addedUser = await registerUser(user);
    console.log(addedUser);
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

export default Register;

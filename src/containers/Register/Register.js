import React, { Component } from "react";
import { registerUser } from "../../helpers";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firstName, email, password } = this.state;

    const user = {
      firstName: firstName,
      email: email,
      password: password
    };

    registerUser(user);
  };

  render() {
    const { firstName, email, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
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

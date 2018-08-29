import React, { Component } from 'react';
import { loginUser } from '../../helpers';

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

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const currentUser = await loginUser(email, password);
    console.log(currentUser);
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

export default Login;

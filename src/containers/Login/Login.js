import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../helpers";
import { setCurrentUser } from "../../actions/userActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
    try {
      const currentUser = await loginUser(email, password);
      this.props.setCurrentUser(currentUser);
      this.setState({
        email: "",
        password: ""
      });
      if (currentUser) {
        this.props.history.push("/");
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);

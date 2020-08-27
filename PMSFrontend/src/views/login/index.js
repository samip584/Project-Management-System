import React from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as loginAction from '../../actions/loginAction';
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  } 
  setEmail(emailValue) {
    this.setState({ email: emailValue });
  }

  setPassword(passwordValue) {
    this.setState({ password: passwordValue });
  }
  handleLogin = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    if (window.localStorage.getItem('token') || this.props.logged_in) {
      return <Redirect to = "/dashboard" />
    }
    return (
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body">

          <Form onSubmit={this.handleLogin}>
            <Form.Group>
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => this.setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password </Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => this.setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return ({
    loginEmail : state.login.loginEmail,
    loginPassword : state.login.loginPassword,
    loginError    : state.login.loginError,
    logged_in : state.login.logged_in
  });
}

function mapDispatchToProps (dispatch) {
  return {
    setEmail: loginEmail => {
      dispatch(loginAction.setEmail(loginEmail));
    },
    
    setPassword: loginPassword => {
      dispatch(loginAction.setPassword(loginPassword));
    },

    login: (email, password) => {
      dispatch(loginAction.userLogin(email, password));
    },

    setLogged_in: () => {
      dispatch(loginAction.setLogged_in(true))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
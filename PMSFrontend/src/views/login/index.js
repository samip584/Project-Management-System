import React from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
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
    fetch('http://localhost:8000/api/login', {
            method  : 'POST',
            headers : {
              'content-type': 'application/json'
            },
            body : JSON.stringify({
              email : this.state.email,
              password : this.state.password,
            })
          })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          console.log(res.token)
          window.localStorage.setItem('token', res.token)
          window.location.reload(true);
        } else {
          alert( 'Wrong password or email ')
        }
      })
      .catch(() =>{
        alert( 'Somethings not right')
      })
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

export default Login;
import React from 'react';
import { connect } from 'react-redux';
import * as registerAction from '../../actions/registerAction';
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Register extends React.Component {
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
    if (this.props.redirectFromRegister) {
      return <Redirect to = '/'></Redirect>
    }
    return (
      <div className="card">
        <h1 className='card-header'>Register</h1>
        <div className="form-register"><br />
          {this.props.registerError && <label>{this.props.registerError}</label>}
          <Form 
            onSubmit = { event => {
              event.preventDefault();
              this.props.userRegister(this.props.registerName, this.props.registerEmail, this.props.registerPassword, this.props.registerRole);
            }}>
            <input 
              onChange = {event => {
                this.props.setName(event.target.value)
              }}
              placeholder = 'Enter Name'
              type        = "text" 
              value       = {this.props.registerName} 
            />
            <br />
            <input 
              onChange = {event => {
                this.props.setEmail(event.target.value)
              }}
              placeholder = 'Enter Email'
              type        = "text" 
              value       = {this.props.registerEmail} 
            />
            <br />
            <input 
              onChange = {event => {
                this.props.setPassword(event.target.value)
              }}
              placeholder = 'Enter Password'
              type        = "password" 
              value       = {this.props.registerPassword} 
            />
            <br />
            <select
            className = "type" 
            id       = "type" 
            name     = "type"
            onChange = {event => { 
              this.props.setRole(event.target.value)
            }}
          >
            <option key="project manager" value = "project manager">Project Manager</option>
            <option key="team lead" value = "team lead">Team Lead</option>
            <option key="engineer" value = "engineer">Engineer</option>
          </select>
            <Button variant="primary" type="submit">Register</Button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return ({
    registerName : state.register.registerName,
    registerRole : state.register.registerRole,
    registerEmail : state.register.registerEmail,
    registerPassword : state.register.registerPassword,
    registerError    : state.register.registerError, 
    redirectFromRegister : state.register.redirectFromRegister
  });
}

function mapDispatchToProps (dispatch) {
  return {
    setEmail: registerEmail => {
      dispatch(registerAction.setEmail(registerEmail));
    },
    
    setPassword: registerPassword => {
      dispatch(registerAction.setPassword(registerPassword));
    },

    setName: name => {
      dispatch(registerAction.setName(name));
    },

    setRole: role => {
      dispatch(registerAction.setRole(role));
    },

    userRegister: (name, email, password, role) => {
      dispatch(registerAction.userRegister(name, email, password, role))
    },

    redirect: () => {
      dispatch(registerAction.redirect(false));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
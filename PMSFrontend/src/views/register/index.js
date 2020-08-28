import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios'

class Register extends React.Component {
  userRegister(name, email, password, role){
    let config = {
      headers: {
        Authorization: window.localStorage.getItem('token') 
      }
    }
    axios.post('http://localhost:8000/api/register', {name, email, password, role}, config)
    .then(() =>{
      alert( 'User added')
      window.location.reload()
    })
    .then(res => res.json())
    .catch(() =>{
      alert( 'Somethings not right')
    })
  }
  render() {
    return (
      <div className="card">
        <h1 className='card-header'>Register</h1>
        <div className="form-register"><br />
          <Form 
            onSubmit = { event => {
              event.preventDefault();
              this.userRegister(event.target[0].value,event.target[1].value, event.target[2].value, event.target[3].value);
            }}>
            <input 
              placeholder = 'Enter Name'
              type        = "text" 
            />
            <br />
            <input 
              placeholder = 'Enter Email'
              type        = "text" 
            />
            <br />
            <input 
              placeholder = 'Enter Password'
              type        = "password"  
            />
            <br />
            <select
            className = "type" 
            id       = "type" 
            name     = "type"
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

export default Register;
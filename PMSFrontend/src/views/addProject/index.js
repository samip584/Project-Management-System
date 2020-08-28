import React from 'react';
import { connect } from 'react-redux';
import * as projectsAction from '../../actions/projectsAction';
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios'

class Register extends React.Component {
  addProject(title, description, project_manager) {
    let config = {
      headers: {
        Authorization: window.localStorage.getItem('token') 
      }
    }
    axios.post('http://localhost:8000/api/project',{title, description, project_manager}, config)
    .then(res => {
      if(res.data){
        window.location.href='/dashboard'
    }})
    
  }

  render() {
    return (
      <div className="card">
        <h1 className='card-header'>AddProject</h1>
        <div className="form-addproject"><br />
          <Form 
            onSubmit = { event => {
              event.preventDefault();
              this.addProject(event.target[0].value,event.target[1].value, event.target[2].value);
            }}>
            <input 
              placeholder = 'Title'
              type        = "text" 
            />
            <br />
            <textarea 
              placeholder = 'Description'
              type        = "text" 
            />
            <br />
            <input 
              placeholder = 'Project Manager Email'
              type        = "text" 
            />
            <br />
            
            <Button variant="primary" type="submit">Register</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
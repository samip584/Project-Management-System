import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProjectWidget from '../../components/projectWidget'

class DashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      projects :[],
      users:[]
    };
  } 
  getData() {
    fetch('http://localhost:8000/api/dashboard', {
      method  : 'GET',
      headers : {
      'Authorization' : window.localStorage.getItem('token'),
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        projects: res.projects,
        users: res.show_User,
      })
    })
    .catch(() =>{
      alert( 'Somethings not right')
    })
  }

  addProjectButton(){
    if(this.state.users){
      return <Button variant="primary" onClick={event =>  window.location.href='/addProject'} >
       Add Project
      </Button>
    }
  }

  registerUserButton(){
    if(this.state.users){
      return <Button variant="primary" onClick={event =>  window.location.href='/register'} >
       Register User
      </Button>
    }
  }

  componentDidMount(){
    this.getData()
  }

  render() {
    if(this.state.projects){
      return (
        <div className="dash-board">
          {this.state.projects.map(project => {
            return <ProjectWidget project = {project}/>
          })}
          <br/>
          {this.addProjectButton()}
          <br/>
          <br/>
          {this.registerUserButton()}
          <br/>
          <br/>
        </div>
      );
    }
  }
}


export default DashBoard;
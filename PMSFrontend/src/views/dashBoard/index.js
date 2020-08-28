import React from 'react';
import { connect } from "react-redux";
import * as userProjectsAction from '../../actions/projectsAction';
import * as usersListAction from '../../actions/usersListAction';
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProjectWidget from '../../components/projectWidget'

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects :[{}],
      users:[{}]
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
      this.props.setUsersList(res.show_User);
      this.props.setProjects(res.projects);
      this.setState({
        projects: res.projects,
        users: res.show_User,
      })
    })
  }

  addProjectButton(){
    if(this.state.users){
      return <Button variant="primary" onClick={event =>  window.location.href='/addProject'} >
       Add User
      </Button>
    }
  }

  componentDidMount(){
    this.getData()
  }

  render() {
    return (
      <div className="dash-board">
        {this.state.projects.map(project => {
          return <ProjectWidget title ={project.title} description = {project.description} tasks = {project.tasks} />
        })}
        {this.addProjectButton()}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return ({
    users: state.users,
    projects : state.projects,
  });
}

function mapDispatchToProps (dispatch) {
  return {
    setProjects: userProjects => {
      dispatch(userProjectsAction.setProjects(userProjects));
    },
    setUsersList: usersList => {
      dispatch(usersListAction.setUsersList(usersList));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
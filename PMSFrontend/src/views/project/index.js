import React, {Component} from 'react'
import {Button, Form} from "react-bootstrap";
import axios from 'axios';
import './project.css'
import {history} from '../history'
class Project extends Component {
  constructor(){
    super()
    this.state = {
      addingMember:false,
      id:'',
      title : '',
      description: '',
      project_manager_id: '',
      project_manager: '',
      tasks: [],
      users: [],
      canAlter: false,
    }
  }


  list_element(task){
    return <div className='show-card'><h5>{task.title}</h5><div>{task.description}</div><div>Deadline: {task.deadline.slice(0, 10)}</div></div>    
  }
  
  loadtasks(){
    if(this.state.tasks){
      return this.state.tasks.map(task => {
        return this.list_element(task)
      })
    }
  }


  member(user){
    return <div className='show-card'><h5>{user.emp_name}</h5><div>email: {user.email}</div></div>    
  }
  
  loadMembers(){
    if(this.state.users){
      return this.state.users.map(user => {
        return this.member(user)
      })
    }
  }

  addProject(email){
    let config = {
      headers: {
        Authorization: window.localStorage.getItem('token') 
      }
    }
    axios.post(`http://localhost:8000/api/project/${this.state.id}/addUser`,{email}, config)
    .then(res => {
      if(res.data){
        window.location.reload()
    }})
    .catch(() =>{
      alert( 'Somethings not right')
    })
    this.setState({addingMember:false});
  }

  addMemberPopup(){
    if(this.state.addingMember){
      return  <Form 
        onSubmit = { event => {
          event.preventDefault();
          this.addProject(event.target[0].value);
      }}> 
        <input 
          placeholder = 'Manager Email'
          type        = "text" 
        />
        <br />
        <Button variant="primary" type="submit">Add</Button>
      </Form>
    }
  }

  addMemberButton(){
    if(this.state.canAlter && !this.state.addingMember)
      return <Button variant="primary" onClick = {() => { this.setState({addingMember: true}) } }>Add Member</Button>
  }
  componentDidMount(){
    let config = {
      headers: {
        Authorization: window.localStorage.getItem('token') 
      }
    }
    axios.get('http://localhost:8000/api/project/'+this.props.match.params.id, config)
    .then(res => {
      console.log(res.data)
      this.setState({
        id: res.data.project.project_id,
        title : res.data.project.title,
        description: res.data.project.description,
        project_manager_id: res.data.project.project_manager,
        employees: res.data.project.employees,
        tasks: res.data.project.tasks,
        users: res.data.project.employees,
        canAlter: res.data.can_alter,
      })
    })
    .then(() =>{
      axios.get('http://localhost:8000/api/user/'+this.state.project_manager_id, config)
      .then(res => {
        this.setState({
          project_manager: res.data
        })
      })
      .catch(() =>{
        alert( 'Somethings not right')
      })
    }).catch(() =>{
      alert( 'Somethings not right')
    })
  }
  addTaskButton(){
    if(this.state.canAlter){
      return <Button variant="primary" onClick = {() => { history.push(`${this.state.id}/addtask`) } }>Add Task</Button>
    }
  }
  render(){
    return(
      <div className = "projectWidget">
        <h1>{this.state.title}</h1>
        <div>{this.state.description}</div>
        <div>Project Manager : {this.state.project_manager.emp_name}</div>
        <div className = 'block'>
        <h3>Tasks</h3>
        <div style={{display: 'flex', flexDirection: "column-reverse"}}>
        {this.loadtasks()}
        </div>
        {this.addTaskButton()}
        </div>
        <div className = 'block'>
        <h3>Members</h3>
        {this.loadMembers()}
        {this.addMemberPopup()}
        {this.addMemberButton()}
        </div>
      </div>
    )
  }
}

export default Project;
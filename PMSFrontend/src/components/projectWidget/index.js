import React, {Component} from 'react'

import './ProjectWidget.css'
import {Button, Accordion, Card } from "react-bootstrap";

class ProjectWidget extends Component {
  constructor(){
    super()
    this.state = {
      id:'',
      title : '',
      description: '',
      project_manager: '',
      tasks: []
    }
  }


  list_element(task){
 
    return <Accordion.Collapse eventKey="0">
      <Card.Body>{task.title}</Card.Body>
    </Accordion.Collapse>
  
  }
  
  loadtasks(){
    if(this.state.tasks){
      return this.state.tasks.map(task => {
        return this.list_element(task)
      })
    }
  }

  componentDidMount(){
    console.log(this.props.project)
    this.setState({
      id: this.props.project.project_id,
      title : this.props.project.title,
      description: this.props.project.description,
      project_manager: this.props.project.project_manager,
      tasks: this.props.project.tasks
    })
  }
  render(){
    return(
      <div className = "projectWidget">
        <Accordion defaultActiveKey="1">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <div class = 'title'><a href = {'/project/' + this.state.id}>{this.state.title}</a></div>
              <div class = 'description'>{this.state.description}</div>
            </Accordion.Toggle>
            {this.loadtasks()}
          </Card>
        </Accordion>
      </div>
    )
  }
}

export default ProjectWidget;
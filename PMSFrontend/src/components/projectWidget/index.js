import React, {Component} from 'react'

import './ProjectWidget.css'
import {Button, Accordion, Card } from "react-bootstrap";

class ProjectWidget extends Component {
  constructor(){
    super()
    this.state = {
      title : '',
      description: '',
      tasks: [{title: 'No tasks', description: ''}]
    }
  }


  list_element(task){
 
    return <Accordion.Collapse eventKey="0">
      <Card.Body>{task.title}</Card.Body>
    </Accordion.Collapse>
  
  }
  
  loadtasks(){
    if(this.props.tasks){
      return this.props.tasks.map(task => {
        return this.list_element(task)
      })
    }
  }
  render(){
    return(
      <div className = "projectWidget">
        <Accordion defaultActiveKey="1">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <div class = 'title'>{this.props.title}</div>
              <div class = 'description'>{this.props.description}</div>
            </Accordion.Toggle>
            {this.loadtasks()}
          </Card>
        </Accordion>
      </div>
    )
  }
}

export default ProjectWidget;
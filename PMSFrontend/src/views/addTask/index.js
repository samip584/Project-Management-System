import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios'

class AddTask extends React.Component {
  constructor(){
    super();
    this.state ={
      startDate: new Date()
    }
  }
  addProject(title, description, assignee) {
    let config = {
      headers: {
        Authorization: window.localStorage.getItem('token') 
      }
    }
    let date =this.state.startDate
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    let deadline = mm + '/' + dd + '/' + yyyy;
    
    axios.post(`http://localhost:8000/api/project/${this.props.match.params.id}/addTask`,{title, description, assignee, deadline}, config)
    .then(res => {
      if(res.data){
        window.location.href=`/project/${this.props.match.params.id}`
    }})
    .catch(() =>{
      alert( 'Somethings not right')
    })
    
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  render() {
    return (
      <div className="card">
        <h1 className='card-header'>Add Task</h1>
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
              placeholder = 'Assignee Email'
              type        = "text" 
            />
            <br />
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
            <br />
            <Button variant="primary" type="submit">Add Task</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddTask;
import React, {Component} from 'react'
import Login from '../login';
import Nav from '../../components/nav';
import Register from '../register';
import DashBoard from '../dashBoard';
import Direct from '../direct';
import AddProject from '../addProject'
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './main.css'

class Main extends Component {
  render(){
    
    return(
      <div>
        <Router>
          <Nav/>
          <Route path="/" component={Direct} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component= {DashBoard}/>
          <Route path="/addProject" component= {AddProject}/>
        </Router>
      </div>
    )
  }
}

export default Main;
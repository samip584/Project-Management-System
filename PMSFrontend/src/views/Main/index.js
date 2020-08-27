import React, {Component} from 'react'
import Login from '../login';
import Nav from '../../components/nav';
import Register from '../register';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './main.css'

class Main extends Component {
  render(){
    return(
      <div>
        <Router>
        <Nav/>
        <Route path="/login" component={() => <Login />} />
        <Route path="/register" component={() => <Register/>} />
        </Router>
      </div>
    )
  }
}

export default Main;
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import Button from "react-bootstrap/Button";
class Direct extends Component {
  seeLogin(){
    if (window.localStorage.getItem('token') || this.props.logged_in) {
      return 
    }
    else{
        return <Redirect to = "/login" />
    }
  }

  render(){
    return<div>
      {this.seeLogin()}
   </div>
  }
}

export default Direct;
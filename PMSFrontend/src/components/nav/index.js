import React, {Component} from 'react'

import './Nav.css'
class Nav extends Component {
  logOut(){
    window.localStorage.removeItem('token')
    window.location.reload(true);
  }
  render(){
    return(
      <div className='Nav__wrapper clearfix'>
        <div className = 'logo-sign left'><a className = 'home' href ="/dashboard">Project Management System</a></div>
        <div className = 'logout' onClick={() => {this.logOut()}}>logout</div>
          
      </div>
    )
  }
}

export default Nav;
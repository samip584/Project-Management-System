import React, {Component} from 'react'

import './Nav.css'
class Nav extends Component {
  render(){
    return(
      <div className='Nav__wrapper clearfix'>
        <div className = 'logo-sign left'>PMS</div>
          {/* <i className='options fa fa-caret-down right'/> */}
      </div>
    )
  }
}

export default Nav;
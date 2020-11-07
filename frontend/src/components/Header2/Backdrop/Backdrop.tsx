import React from 'react'

import './Backdrop.css'

const Backdrop = (props) => {
  return (
    <div
      className="backdrop"
      onClick={(e) => props.sideBarToggleHandler(e)}
    ></div>
  )
}

export default Backdrop

import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        marginTop: '50px',
        color: '#59CD9F'
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default Loader

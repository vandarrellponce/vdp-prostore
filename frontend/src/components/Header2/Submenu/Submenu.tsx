import React, { useEffect, useRef } from 'react'
import './Submenu.css'

const Submenu = (props) => {
  const container = useRef(null)
  const className = `${props.show ? 'submenu show' : 'submenu'}`

  useEffect(() => {
    const submenu = container.current
    const { center, bottom } = props.location
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`
  }, [props.location])

  return (
    <div className={className} ref={container}>
      <h3>Submenu</h3>
    </div>
  )
}

export default Submenu

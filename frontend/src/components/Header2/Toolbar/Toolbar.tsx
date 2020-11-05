import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import socketIOClient from 'socket.io-client'
import SearchBox from '../../SearchBox'
import './Toolbar.css'
import Axios from 'axios'
import logoutUser from '../../../actions/users/logoutUser'
import Sidebar from '../Sidebar/Sidebar'
import Backdrop from '../Backdrop/Backdrop'
const ENDPOINT = '/'

const Toolbar = () => {
  const { userInfo } = useSelector((state) => state.user)
  const [notifs, setNotifs] = useState([])
  const [totalNotifs, setTotalNotifs] = useState(0)
  const dispatch = useDispatch()

  const [sideBarOpen, setSideBarOpen] = useState(false)

  const getNotifications = () => {
    if (userInfo && userInfo.isAdmin) {
      Axios.get('/api/notifications/admin?limit=10')
        .then((res) => {
          setTotalNotifs(res.data.count)
          setNotifs(res.data.notifs)
        })
        .catch((e) => console.log(e.message))
    }
    if (userInfo && !userInfo.isAdmin) {
      Axios.get(`/api/notifications/user/${userInfo._id}?limit=10`)
        .then((res) => {})
        .catch((e) => e)
    }
  }

  useEffect(() => {
    getNotifications()

    const socket = socketIOClient(ENDPOINT)
    socket.on('newNotification', () => getNotifications())
    socket.on('updateNotification', () => getNotifications())
    return () => socket.disconnect()
    /* eslint-disable */
  }, [userInfo])

  // HANDLERS
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
    /* window.location.reload() */
  }

  const sideBarToggleHandler = (e) => {
    e.preventDefault()
    setSideBarOpen((prevState) => !prevState)
  }

  return (
    <header>
      <Sidebar sideBarToggleHandler={sideBarToggleHandler} show={sideBarOpen} />
      {sideBarOpen && <Backdrop sideBarToggleHandler={sideBarToggleHandler} />}

      <nav className="toolbar__nav">
        <div className="toolbar__icon">
          <i className="fas fa-bars fa-2x" onClick={sideBarToggleHandler}></i>
        </div>

        {/* LOGO */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="toolbar__brand">
            <div style={{ color: 'black' }}>KUMBA</div>{' '}
            <div style={{ color: 'rgb(86,204,157)' }}>TEA</div>
          </div>
        </Link>
        <div className="toolbar__searchbox">
          <Route render={({ history }) => <SearchBox history={history} />} />
        </div>

        <div className="spacer"></div>
        <div className="toolbar__right__links">
          <Link to="/cart" className="toolbar__link" tabIndex={1}>
            Cart
          </Link>
          {userInfo ? (
            <div className="toolbar__right__links__signedin">
              <Link to="/profile" className="toolbar__link" tabIndex={1}>
                {userInfo.name}
              </Link>
              <div className="toolbar__link" tabIndex={1}>
                Notifications
              </div>
              <div
                className="toolbar__link"
                tabIndex={1}
                onClick={logoutHandler}
              >
                Logout
              </div>
            </div>
          ) : (
            <Link to="/login" className="toolbar__link" tabIndex={1}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Toolbar

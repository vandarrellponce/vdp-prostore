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
import { CSSTransition } from 'react-transition-group'
import { Badge } from 'react-bootstrap'
import { FiShoppingCart } from 'react-icons/fi'
import { RiNotification2Line } from 'react-icons/ri'
import { BiExit } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FaBars } from 'react-icons/fa'
import { Spring } from 'react-spring/renderprops'
import Submenu from '../Submenu/Submenu'
const ENDPOINT = '/'

const Toolbar = () => {
  const { userInfo, authError } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)
  const [notifs, setNotifs] = useState([])
  const [totalNotifs, setTotalNotifs] = useState(0)
  const dispatch = useDispatch()

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
  }, [userInfo, authError])

  // HANDLERS
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logoutUser()).then((_) => window.location.reload())
  }

  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const [location, setLocation] = useState({})

  const sideBarToggleHandler = (e) => {
    e.preventDefault()
    setSideBarOpen((prevState) => !prevState)
  }

  // open submenu when mouse hover on icon
  /* const openSubMenu = (e) => {
    const link = e.target.className.animVal.split(' ')[1]
    const tempBtn = e.target.getBoundingClientRect()
    const center = (tempBtn.left + tempBtn.right - 755) / 2
    const bottom = tempBtn.bottom + 15
    setLocation({ center, bottom })
    setSubMenuOpen(true)
  }
  const closeSubMenu = (e) => {
    e.preventDefault()
    setSubMenuOpen(false)
  } */

  // open submenu when clicked
  const toggleSubMenu = (e) => {
    const link = e.target.className.animVal.split(' ')[1]
    const tempBtn = e.target.getBoundingClientRect()
    const center = (tempBtn.left + tempBtn.right - 205) / 2
    const bottom = tempBtn.bottom + 15
    setLocation({ center, bottom })
    setSubMenuOpen((prev) => !prev)
  }

  return (
    <header className="toolbar">
      {/* SIDEBAR */}
      <Sidebar
        sideBarToggleHandler={sideBarToggleHandler}
        show={sideBarOpen}
        notifs={notifs}
        totalNotifs={totalNotifs}
        cartItems={cartItems}
      />

      {/* SUBMENU */}
      <Submenu
        show={subMenuOpen}
        setSubMenuOpen={setSubMenuOpen}
        location={location}
      />

      {/* BACKDROP */}
      {sideBarOpen && (
        <CSSTransition
          in={sideBarOpen}
          appear={true}
          timeout={100}
          classNames="fade"
        >
          <Backdrop sideBarToggleHandler={sideBarToggleHandler} />
        </CSSTransition>
      )}

      <nav className="toolbar__nav">
        {/* MENU BUTTON */}
        <div className="toolbar__icon">
          <FaBars
            size="30px"
            onClick={sideBarToggleHandler}
            style={{
              color: 'white',
              background:
                'linear-gradient(90deg, rgba(243,150,154,1) 0%, rgba(86,204,157,1) 100%)',
              borderRadius: '3px',
              margin: '5px',
              padding: '8px'
            }}
          />
        </div>

        {/* LOGO */}
        <Spring
          from={{ opacity: 0, marginLeft: -100 }}
          to={{ opacity: 1, marginLeft: 0 }}
          config={{ delay: 1500, duration: 500 }}
        >
          {(sprops) => (
            <div style={sprops}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="toolbar__brand">
                  <div style={{ color: 'black' }}>KUMBA</div>{' '}
                  <div style={{ color: 'rgb(86,204,157)' }}>TEA</div>
                </div>
              </Link>
            </div>
          )}
        </Spring>

        <Spring
          from={{ opacity: 0, marginLeft: -100 }}
          to={{ opacity: 1, marginLeft: 0 }}
          config={{ delay: 2000, duration: 500 }}
        >
          {(sprops) => (
            <div style={sprops}>
              <div className="toolbar__searchbox">
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
              </div>
            </div>
          )}
        </Spring>

        <div className="spacer"></div>

        {/* LINKS */}
        <div className="toolbar__right__links">
          {/* CART */}
          <Spring
            from={{ opacity: 0, marginRight: -500 }}
            to={{ opacity: 1, marginRight: 0 }}
            config={{ delay: 1000, duration: 1000 }}
          >
            {(sprops) => (
              <div style={sprops}>
                <Link to="/cart" className="toolbar__link" tabIndex={1}>
                  <FiShoppingCart
                    size="25px"
                    className="toolbar__link__icon cart"
                    /*  onMouseOver={(e) => openSubMenu(e)}
                    onMouseOut={(e) => closeSubMenu(e)} */
                  />
                  {/* cart */}
                  <Badge variant="primary" className="toolbar__badge">
                    {cartItems.length > 0 ? cartItems.length : null}
                  </Badge>
                </Link>
              </div>
            )}
          </Spring>

          {userInfo ? (
            <div className="toolbar__right__links__signedin">
              {/* NOTIFICATIONS */}
              <Spring
                from={{ opacity: 0, marginTop: -500 }}
                to={{ opacity: 1, marginTop: 0 }}
                config={{ delay: 1200, duration: 1000 }}
              >
                {(sprops) => (
                  <div style={sprops}>
                    <div className="toolbar__link" tabIndex={1}>
                      <RiNotification2Line
                        onClick={(e) => toggleSubMenu(e)}
                        size="25px"
                        className="toolbar__link__icon notification"
                      />
                      <Badge variant="secondary" className="toolbar__badge">
                        {totalNotifs > 0 ? totalNotifs : null}
                      </Badge>
                    </div>
                  </div>
                )}
              </Spring>

              {/* PROFILE */}
              <Spring
                from={{ opacity: 0, marginTop: -500 }}
                to={{ opacity: 1, marginTop: 0 }}
                config={{ delay: 1300, duration: 1000 }}
              >
                {(sprops) => (
                  <div style={sprops}>
                    <Link to="/profile" className="toolbar__link" tabIndex={1}>
                      {userInfo.name}{' '}
                      <CgProfile size="25px" className="toolbar__link__icon" />
                    </Link>
                  </div>
                )}
              </Spring>

              <Spring
                from={{ opacity: 0, marginTop: -500 }}
                to={{ opacity: 1, marginTop: 0 }}
                config={{ delay: 1400, duration: 1000 }}
              >
                {(sprops) => (
                  <div style={sprops}>
                    <div
                      className="toolbar__link"
                      tabIndex={1}
                      onClick={logoutHandler}
                    >
                      Logout{' '}
                      <BiExit size="25px" className="toolbar__link__icon" />
                    </div>
                  </div>
                )}
              </Spring>
            </div>
          ) : (
            authError && (
              <Link to="/login" className="toolbar__link" tabIndex={1}>
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  )
}

export default Toolbar

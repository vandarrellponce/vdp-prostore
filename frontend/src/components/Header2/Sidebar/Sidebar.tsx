import React from 'react'
import { Badge } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import logoutUser from '../../../actions/users/logoutUser'
import SearchBox from '../../SearchBox'
import { IoIosArrowBack } from 'react-icons/io'
import './Sidebar.css'

const Sidebar = (props) => {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  let className = 'sidebar'
  if (props.show) className = 'sidebar open'

  // HANDLERS
  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
    /* window.location.reload() */
  }
  return (
    <div className={className}>
      <IoIosArrowBack
        className="fas fa-backspace fa-lg"
        style={{
          position: 'absolute',
          top: '5px',
          right: '10px',
          margin: '5px',
          cursor: 'pointer'
        }}
        onClick={(e) => props.sideBarToggleHandler(e)}
      />
      <div className="sidebar__brand">
        <div style={{ color: 'black' }}>KUMBA</div>{' '}
        <div style={{ color: 'rgb(86,204,157)' }}>TEA</div>
      </div>

      <div className="sidebar__searchbox">
        <Route render={({ history }) => <SearchBox history={history} />} />
      </div>
      <nav className="sidebar__container2"></nav>
      <nav className="sidebar__container1">
        Basic Controls
        {userInfo ? (
          <div style={{ width: '100%' }}>
            {/* NOTIFICATION */}

            <Link to="/" className="sidebar__link">
              <div className="sidebar__nav__item" tabIndex={1}>
                &#x1F514; Notifications
                <Badge variant="secondary" className="toolbar__badge">
                  {props.totalNotifs > 0 ? props.totalNotifs : null}
                </Badge>
              </div>
            </Link>

            {/* CART */}
            <Link to="/cart" className="sidebar__link">
              <div className="sidebar__nav__item" tabIndex={1}>
                &#x1F6D2; Cart
                <Badge variant="primary" className="toolbar__badge">
                  {props.cartItems.length > 0 ? props.cartItems.length : null}
                </Badge>
              </div>
            </Link>
            {/* PROFILE */}
            <Link to="/profile" className="sidebar__link">
              <div className="sidebar__nav__item" tabIndex={1}>
                &#x1F973; Profile
              </div>
            </Link>
            <Link to="/" className="sidebar__link" onClick={logoutHandler}>
              <div className="sidebar__nav__item" tabIndex={1}>
                &#x1F97A; Logout
              </div>
            </Link>
          </div>
        ) : (
          <Link to="/Login" className="sidebar__link">
            <div className="sidebar__nav__item" tabIndex={1}>
              Login
            </div>
          </Link>
        )}
      </nav>
      {userInfo?.isAdmin && (
        <nav className="sidebar__container1">
          Admin Controls
          <Link to="/admin/orderlist" className="sidebar__link">
            <div className="sidebar__nav__item" tabIndex={1}>
              &#x1F911; Orders
            </div>
          </Link>
          <Link to="/admin/productlist" className="sidebar__link">
            <div className="sidebar__nav__item" tabIndex={1}>
              &#x1F964; Products
            </div>
          </Link>
          <Link to="/admin/userlist" className="sidebar__link">
            <div className="sidebar__nav__item" tabIndex={1}>
              &#x1F465; Customers
            </div>
          </Link>
          <Link to="/" className="sidebar__link">
            <div className="sidebar__nav__item" tabIndex={1}>
              &#x1F5C3; Categories
            </div>
          </Link>
        </nav>
      )}
    </div>
  )
}

export default Sidebar

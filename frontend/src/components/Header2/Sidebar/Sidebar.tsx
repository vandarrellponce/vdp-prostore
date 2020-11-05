import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import logoutUser from '../../../actions/users/logoutUser'
import SearchBox from '../../SearchBox'
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
      <i
        className="fas fa-backspace fa-lg"
        style={{
          position: 'absolute',
          top: '5px',
          right: '10px',
          margin: '5px',
          cursor: 'pointer'
        }}
        onClick={(e) => props.sideBarToggleHandler(e)}
      ></i>
      <div className="sidebar__searchbox">
        <Route render={({ history }) => <SearchBox history={history} />} />
      </div>

      <nav className="sidebar__container2">
        <Link to="/" className="sidebar__link">
          <div className="sidebar__nav__item" tabIndex={1}>
            Notifications &#x1F514;
          </div>
        </Link>
      </nav>

      <nav className="sidebar__container1">
        Basic Controls
        {userInfo ? (
          <div style={{ width: '100%' }}>
            <Link to="/cart" className="sidebar__link">
              <div className="sidebar__nav__item" tabIndex={1}>
                &#x1F6D2; Cart
              </div>
            </Link>
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
    </div>
  )
}

export default Sidebar

import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import './Header.css'
//import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import logoutUser from '../../actions/users/logoutUser'
import SearchBox from '../SearchBox'
import { Badge, Image } from 'react-bootstrap'
import Axios from 'axios'
import socketIOClient from 'socket.io-client'
const ENDPOINT = '/'

const Header = () => {
	const { userInfo } = useSelector((state) => state.user)
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
	}, [userInfo])

	// HANDLERS
	const logoutHandler = (e) => {
		e.preventDefault()
		dispatch(logoutUser())
		/* window.location.reload() */
	}

	return (
		<header>
			<Navbar
				className="pr-5 pl-5"
				style={{ fontSize: '14px' }}
				variant="light"
				bg="light"
				expand="lg"
				collapseOnSelect
				sticky="top"
			>
				{/* <Container> */}
				<LinkContainer to="/">
					<Navbar.Brand className="header__brand">
						{/* <Image
								src="/images/kumbatealogo3.png"
								alt="Kumbatea Logo"
								style={{ height: '70px', width: '170px' }}
							/> */}
						<div style={{ display: 'flex' }}>
							<div style={{ color: 'black' }}>KUMBA</div>{' '}
							<div style={{ color: 'rgb(86,204,157)' }}>TEA</div>
						</div>
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse id="basic-navbar-nav" className="align">
					<Route render={({ history }) => <SearchBox history={history} />} />

					{/* CART */}
					<Nav className="ml-auto">
						<LinkContainer to="/cart/">
							<Nav.Link>
								<i className="fas fa-shopping-cart px-1"></i>
								Cart
							</Nav.Link>
						</LinkContainer>

						{/* NOTIFICATIONS */}
						{userInfo && (
							<NavDropdown
								title={
									<span>
										Alerts{' '}
										{notifs.length !== 0 && (
											<Badge variant="primary">{totalNotifs}</Badge>
										)}
									</span>
								}
								id="basic-nav-dropdown"
								disabled={notifs.length === 0}
							>
								{notifs.length > 0 &&
									notifs.map((notif, i) => (
										<LinkContainer
											to={`/orders/${notif.payload}/pay`}
											key={i}
											style={{ fontSize: '12px', padding: '5px' }}
											onClick={(e) => {
												Axios.put(
													`/api/notifications/${notif._id}`
												).then((res) => getNotifications())
											}}
										>
											<NavDropdown.Item>
												{!notif.isViewed && (
													<Badge variant="success">New</Badge>
												)}
												{` ${notif.message}. ${notif.payload}`}
											</NavDropdown.Item>
										</LinkContainer>
									))}
							</NavDropdown>
						)}

						{/* PROFILE */}
						{userInfo ? (
							<NavDropdown title={userInfo.name} id="basic-nav-dropdown">
								<LinkContainer to="/profile">
									<NavDropdown.Item>My Profile</NavDropdown.Item>
								</LinkContainer>

								<NavDropdown.Item onClick={logoutHandler}>
									Logout
								</NavDropdown.Item>

								<NavDropdown.Divider />

								<LinkContainer to="/profile">
									<NavDropdown.Item>Other Link</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						) : (
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-user px-1"></i>
									Login
								</Nav.Link>
							</LinkContainer>
						)}

						{/* CONFIG */}
						{userInfo && userInfo.isAdmin && (
							<NavDropdown title="Config" id="admin-menu">
								<LinkContainer to="/admin/userlist">
									<NavDropdown.Item>Users</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer to="/admin/productlist">
									<NavDropdown.Item>Products</NavDropdown.Item>
								</LinkContainer>

								<LinkContainer to="/admin/orderlist">
									<NavDropdown.Item>Orders</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						)}
					</Nav>
					{/* <Form inline>
						<FormControl
							type="text"
							placeholder="Search"
							className="mr-sm-2"
						/>
						<Button variant="outline-success">Search</Button>
					</Form> */}
				</Navbar.Collapse>
				{/* 	</Container> */}
			</Navbar>
		</header>
	)
}

export default Header

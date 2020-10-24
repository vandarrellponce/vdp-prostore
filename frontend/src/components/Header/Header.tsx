import React from 'react'
import { Route } from 'react-router-dom'
import './Header.css'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import logoutUser from '../../actions/users/logoutUser'
import SearchBox from '../SearchBox'
import { Image } from 'react-bootstrap'

const Header = () => {
	const { userInfo } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	// HANDLERS
	const logoutHandler = (e) => {
		e.preventDefault()
		dispatch(logoutUser())
		/* window.location.reload() */
	}

	return (
		<header>
			<Navbar
				variant="dark"
				bg="dark"
				expand="lg"
				collapseOnSelect
				sticky="top"
			>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<Image
								src="https://lh3.googleusercontent.com/pw/ACtC-3ecFrJF63hprSe5c9PmDeAG7R2ci5cYV-tbf9dvqG88wll2-uUnUlcaz2zta0L_--gDQtZ319jImS1U2KQRdBN8aPuQwQN7MjQJfUSQRV3f3I3NhPRVjU_KmF1DWDRQvoB_GfYG-bHMk4ypA-T1SyXQ=w1514-h913-no?authuser=0"
								alt="Kumbatea Logo"
								style={{ height: '50px', width: '90px' }}
							/>
						</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Navbar.Collapse id="basic-navbar-nav">
						<Route render={({ history }) => <SearchBox history={history} />} />
						{/* margin left auto */}
						<Nav className="ml-auto">
							<LinkContainer to="/cart/">
								<Nav.Link>
									<i className="fas fa-shopping-cart px-1"></i>
									Cart
								</Nav.Link>
							</LinkContainer>

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
				</Container>
			</Navbar>
		</header>
	)
}

export default Header

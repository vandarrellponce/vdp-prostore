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
								src="https://lh3.googleusercontent.com/NZn_LPR90sfkQsD1TYhsj0k_jhngmtzCkuRCgqtzpppwWOoD1ehQ7pAUundwL9atPczlq62Xc1gkO49CG4aTpuG3r2NeY77TNLdUHzd9au6o1GfajaebEg9kEtJrCRMCCkm523onmxb6fkNLEx1ZuHqUPLmx-xLzmU1hSRDI3p2TEdjrUH1hxUQRYnS0tA6qW2TvrPxSKakXVmwVWL78sFOFIEVJ1UjNBSGobuqvXrqR2AKJnKvt1YzUnd2XP2I1DcZj2ucsnYwCXsPm5VelIYEgWeLDeWMN5Op7Rv5OlrhTzl0al4PluPeEw9XNSnljjywoLaNhr3bVD2oQbCXvHe3euVLSA_AbNPIhBaqavaIaHiAQEdUVsYQCUDdKbnM25tWMBxMx4jjEB_h9fosR4MQWIqNbFryWvfTU4SbHb3FDNrpMQFlNFx9BH1UtqtqZZSAoshjJUCb_M-lLmiUQp8UnnzOflw5hc_Egqez8hMjkcZQN6j4eag6DHADYLaEkT-mj8PXiH-3NnJ1UjZsRhfhv7oRGgKCjUFMeIV1eA2iV6Uq4gxJbbVpIUFBg6gH0L3SCS-OsUuwxFYqY--2bdgapH1Tcz3YKUtFmGH0FxqLp3dX4GJs5JzNVr0yWt5hCnff6755hVLMaYZ25H9I-HfdNxG1zVMLEQo0UXgROCq9P7MOu6wf1YWwhofA4sg=w1920-h684-no?authuser=0"
								alt="Kumbatea Logo"
								style={{ height: '50px', width: '100px' }}
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

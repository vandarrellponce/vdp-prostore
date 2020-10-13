import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom'
import './app.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import CartScreen from './screens/CartScreen'
import Home from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProductDetail from './screens/ProductDetailScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './components/Loader/Loader'
import { authUser } from './actions/users/loginUser'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

const App = () => {
	const { userInfo } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(authUser())
	}, [])

	return (
		<BrowserRouter>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/products/:id" component={ProductDetail} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/" exact component={Home} />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	)
}

export default App

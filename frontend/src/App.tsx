import React from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom'
import './app.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import CartScreen from './screens/CartScreen'
import Home from './screens/HomeScreen'
import ProductDetail from './screens/ProductDetailScreen'

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/products/:id" component={ProductDetail} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/" exact component={Home} />
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	)
}

export default App

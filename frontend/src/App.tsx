import React from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom'
import './app.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './screens/Home'
import ProductDetail from './screens/ProductDetail'

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/" exact>
						<Home />
					</Route>

					<Route path="/products/:productId" exact>
						<ProductDetail />
					</Route>
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	)
}

export default App

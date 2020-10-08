import React from 'react'
import Container from 'react-bootstrap/Container'
import './app.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './screens/Home'

const App = () => {
	return (
		<div className="app">
			<Header />
			<main className="py-3">
				<Container>
					<Home />
				</Container>
			</main>
			<Footer />
		</div>
	)
}

export default App

import React from 'react'
import Container from 'react-bootstrap/Container'
import './app.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

const App = () => {
	return (
		<div className="app">
			<Header />
			<main className="py-3">
				<Container>
					<h1>welcome to my shop</h1>
				</Container>
			</main>
			<Footer />
		</div>
	)
}

export default App

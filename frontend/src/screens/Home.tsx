import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Product from '../components/Product/Product'

const Home = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		Axios.get('http://localhost:5000/api/products').then((res) =>
			setProducts(res.data)
		)
	}, [])
	return (
		<div>
			<h2 className="text-center">Latest Products</h2>
			<Row>
				{products.map((product, i) => (
					<Col key={i} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</div>
	)
}

export default Home

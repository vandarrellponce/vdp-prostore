import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Product from '../components/Product/Product'
import products from '../products'

const Home = () => {
	return (
		<div>
			<h2 className="text-center">Latest Products</h2>
			<Row>
				{products.map((product) => (
					<Col sm={12} md={6} lg={4} xl={3} key={product.id}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</div>
	)
}

export default Home

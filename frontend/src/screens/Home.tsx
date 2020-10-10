import Axios from 'axios'
import React, { useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Product from '../components/Product/Product'
import { useSelector, useDispatch } from 'react-redux'
import { getProductList } from '../actions/productActions'

const Home = () => {
	const { products, loading, error } = useSelector(
		(state) => state.productList
	)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProductList())
	}, [dispatch])

	if (loading) return <div> Fetching Product Data</div>
	if (error) return <div> Error Loading Product Data : ({error})</div>

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

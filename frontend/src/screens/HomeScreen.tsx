import React, { useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Image from 'react-bootstrap/Image'
import Product from '../components/Product/Product'
import { useSelector, useDispatch } from 'react-redux'
import getProductList from '../actions/products/productListActions'
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'

const Home = () => {
	const { products, loading, error } = useSelector((state) => state.productList)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProductList())
	}, [dispatch])

	if (loading) return <Loader />
	if (error)
		return (
			<Message
				variant="secondary"
				children={<h5>`Error Loading Product Data : ({error})` </h5>}
			/>
		)

	return (
		<div>
			{/* <h2 className="text-center">Latest Products</h2> */}
			<Image
				src="https://dkemhji6i1k0x.cloudfront.net/000_clients/84990/page/84990A4MpBhxj.jpg"
				alt="banner"
				style={{
					marginBottom: '-150px',
					objectFit: 'contain',
					width: '100%',
					maskImage:
						'linear-gradient(to bottom,rgba(0, 0, 0, 1),rgba(0, 0, 0, 0)',
				}}
			/>

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

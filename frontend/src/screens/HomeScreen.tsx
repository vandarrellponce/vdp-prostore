import React, { useEffect } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel'
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

			<Carousel className="home__banner">
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_Tallhero_Dash_en_US_1x._CB418727898_.jpg"
						alt="First slide"
					/>
					<Carousel.Caption>
						<h3>First slide label</h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Sports_en_US_1x._CB431860448_.jpg"
						alt="Third slide"
					/>
					<Carousel.Caption>
						<h3>Second slide label</h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/PrimeDay/Fuji_TallHero_NonPrime_v2_en_US_1x._CB403670067_.jpg"
						alt="Third slide"
					/>
					<Carousel.Caption>
						<h3>Third slide label</h3>
						<p></p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
			{/* <Image
				src=""
				alt="banner"
				className="home__banner"
			/> */}

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

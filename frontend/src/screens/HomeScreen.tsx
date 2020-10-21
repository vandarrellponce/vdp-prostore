import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Carousel from 'react-bootstrap/Carousel'
import Product from '../components/Product/Product'
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'
import Paginate from '../components/Paginate'
import { getConfig } from '../utils/utils'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Home = ({ match }) => {
	// STATES
	const [loading, setLoading] = useState(false)
	const [error] = useState(null)
	const [products, setProducts] = useState([])

	const keyword = match.params.keyword || ''
	const [pageSize] = useState(8)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(null)

	const getProducts = (options) => {
		setLoading(true)
		Axios.post(`/api/products?keyword=${keyword}`, options, getConfig())
			.then((res) => {
				setProducts(res.data.products)
				setTotalPages(res.data.totalPages)
				setLoading(false)
			})
			.catch((e) => {
				setLoading(false)
				console.log(e)
			})
	}

	// USE EFFECT
	useEffect(() => {
		getProducts({ pageSize, page })
		/* eslint-disable */
	}, [keyword, page, pageSize])

	// HANDLERS
	const handleSetPage = (page) => {
		setPage(page)
		const options = {
			pageSize,
			page,
		}
		getProducts(options)
	}

	// CHECKER
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
			<Helmet>
				<title>Pro Store | Home</title>
				<meta name="description" content="We sell the best milk tea in town" />
			</Helmet>

			<Carousel pause="hover" className="home__banner">
				<Carousel.Item>
					<Link to="/">
						<img
							className="d-block w-100"
							src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_Tallhero_Dash_en_US_1x._CB418727898_.jpg"
							alt="First slide"
						/>
					</Link>
					<Carousel.Caption>
						<h3>First slide label</h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<Link to="/">
						<img
							className="d-block w-100"
							src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Sports_en_US_1x._CB431860448_.jpg"
							alt="Third slide"
						/>
						<Carousel.Caption>
							<h3>Second slide label</h3>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
				<Carousel.Item>
					<Link to="/">
						<img
							className="d-block w-100"
							src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/PrimeDay/Fuji_TallHero_NonPrime_v2_en_US_1x._CB403670067_.jpg"
							alt="Third slide"
						/>
						<Carousel.Caption>
							<h3>Third slide label</h3>
							<p></p>
						</Carousel.Caption>
					</Link>
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
			<Paginate setPage={handleSetPage} totalPages={totalPages} page={page} />
		</div>
	)
}

export default Home

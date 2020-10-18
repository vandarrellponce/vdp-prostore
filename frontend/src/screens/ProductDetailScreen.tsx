import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating/Rating'
import getProductDetails from '../actions/products/productDetailsAction'
import Loader from '../components/Loader/Loader'
import Message from '../components/Message/Message'
import addToCart from '../actions/cart/addToCart'

const ProductDetail = (props) => {
	//	STATES
	const productId = props.match.params.id
	const [qty, setQty] = useState(1)
	const { product, loading, error } = useSelector((state) => {
		return state.productDetails
	})
	const dispatch = useDispatch()
	const qtyValues = [...Array(product.countInStock)].map((x, i) => (
		<option key={i + 1} value={i + 1}>
			{i + 1}
		</option>
	))

	// USE EFFECTS
	useEffect(() => {
		dispatch(getProductDetails(productId))
	}, [dispatch, productId])

	if (loading) return <Loader />
	if (error)
		return (
			<Message
				variant="danger"
				children={<h5>`Error loading Product Details - (${error})`</h5>}
			/>
		)

	// HANDLERS
	const addToCartHandler = (e) => {
		e.preventDefault()
		dispatch(addToCart(product._id, qty))
		props.history.push('/cart')
		/* props.history.push(`/cart/${product._id}?qty=${qty}`) */
	}

	return (
		<div>
			<Link to="/">
				<Button className="btn my-3 btn-secondary" type="button">
					Go Back
				</Button>
			</Link>

			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>

				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>

						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							></Rating>
						</ListGroup.Item>

						<ListGroup.Item>Price: P{product.price}</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>P{product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0
											? 'In Stock'
											: 'Out of Stock'}
									</Col>
								</Row>
							</ListGroup.Item>
							{product.countInStock > 0 && (
								<ListGroup.Item>
									<Row>
										<Col>Quantity:</Col>
										<Col>
											<Form.Control
												as="select"
												value={qty}
												onChange={(e) =>
													setQty(
														Number(e.target.value)
													)
												}
											>
												{qtyValues}
											</Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								<Button
									className="btn-block btn-warning"
									type="button"
									disabled={product.countInStock === 0}
									onClick={addToCartHandler}
								>
									Add To Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default ProductDetail

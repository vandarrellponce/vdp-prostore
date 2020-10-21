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
import Axios from 'axios'
import { PRODUCT_DETAILS_SUCCESS } from '../constants/productConst'
import { getConfig } from '../utils/utils'

const ProductDetail = (props) => {
	//	STATES
	const productId = props.match.params.id
	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState('')
	const [comment, setComment] = useState('')
	const [reviewError, setReviewError] = useState(null)
	const [reviewLoading, setReviewLoading] = useState(false)
	const { userInfo } = useSelector((state) => state.user)
	const { product, loading, error } = useSelector((state) => {
		return state.productDetails
	})
	const dispatch = useDispatch()

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
	if (!product) return <Loader />
	const qtyValues = [...Array(product.countInStock)].map((x, i) => (
		<option key={i + 1} value={i + 1}>
			{i + 1}
		</option>
	))

	// HANDLERS
	const addToCartHandler = (e) => {
		e.preventDefault()
		dispatch(addToCart(product._id, qty))
		props.history.push('/cart')
		/* props.history.push(`/cart/${product._id}?qty=${qty}`) */
	}

	const submitHandler = (e) => {
		e.preventDefault()
		const review = {
			name: userInfo.name,
			rating,
			comment,
		}
		setReviewLoading(true)
		Axios.post(`/api/products/${productId}/reviews`, review, getConfig())
			.then((res) => {
				dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data })
				setReviewLoading(false)
				alert('Review Submitted')
				setRating('')
				setComment('')
			})
			.catch((error) => {
				setReviewLoading(false)
				setReviewError(
					error.response?.data?.message
						? error.response.data.message
						: error.message
				)
			})
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
						<ListGroup.Item variant="light">
							<h5>{product.name}</h5>
						</ListGroup.Item>

						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							></Rating>
						</ListGroup.Item>

						<ListGroup.Item>
							<strong> Brand:</strong>
							<br /> {product.brand}
						</ListGroup.Item>
						<ListGroup.Item>
							<strong> Category:</strong>
							<br /> {product.category}
						</ListGroup.Item>
						<ListGroup.Item>
							<strong>Item Description:</strong>
							<br />
							{product.description}
						</ListGroup.Item>
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
										{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
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
												onChange={(e) => setQty(Number(e.target.value))}
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
			<Row>
				<Col md={6}>
					<h2>REVIEWS</h2>
					{product.reviews.length === 0 && <Message>No reviews yet</Message>}
					<ListGroup variant="flush">
						{product.reviews.map((review) => (
							<ListGroup.Item key={review._id}>
								<strong>{review.name}</strong>
								<Rating value={review.rating} />
								<p>{review.createdAt.substring(0, 10)}</p>
								<p>{review.comment}</p>
							</ListGroup.Item>
						))}

						<ListGroup.Item>
							<h4>WRITE A REVIEW</h4>
							{reviewError && (
								<Message children={reviewError} variant="danger" />
							)}
							{reviewLoading && <Loader />}
							{userInfo ? (
								<Form onSubmit={submitHandler}>
									<Form.Group>
										<Form.Label>Rating</Form.Label>
										<Form.Control
											required
											as="select"
											value={rating}
											onChange={(e) => setRating(e.target.value)}
										>
											<option value="">Select...</option>
											<option value="1">1 - Poor</option>
											<option value="2">2 - Fair</option>
											<option value="3">3 - Good</option>
											<option value="4">4 - Very Good</option>
											<option value="5">5 - Excellent</option>
										</Form.Control>
									</Form.Group>
									<Form.Group>
										<Form.Label>Comment</Form.Label>
										<Form.Control
											required
											as="textarea"
											value={comment}
											onChange={(e) => setComment(e.target.value)}
										></Form.Control>
									</Form.Group>
									<Button type="submit" variant="info">
										Submit
									</Button>
								</Form>
							) : (
								<Message children="Please log in to write a review" />
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</div>
	)
}

export default ProductDetail

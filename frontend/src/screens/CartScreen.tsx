import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import addToCart from '../actions/cart/addToCart'
import removeFromCart from '../actions/cart/removeFromCart'

const CartScreen = ({ match, location, history }) => {
	// STATES
	const productId = match.params.id
	const qty = location.search ? Number(location.search.split('=')[1]) : 1
	const { cartItems } = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	// USE EFFECT
	useEffect(() => {
		if (productId) dispatch(addToCart(productId, qty))
	}, [dispatch, productId, qty])

	// HANDLERS
	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
		history.push('/cart')
	}

	const checkOutHandler = (e) => {
		history.push('/shipping')
	}

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your Cart is Empty,
						<Link to="/"> Go back to products </Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={3}>
										<Link to={`/products/${item.product}`}>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>{item.price}</Col>

									{/* CHANGE THE QUANTITY OF SELECTED PRODUCT */}
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) => {
												dispatch(
													addToCart(
														item.product,
														Number(e.target.value)
													)
												)
												history.push('/cart')
											}}
										>
											{[...Array(item.countInStock)].map(
												(x, i) => (
													<option
														key={i + 1}
														value={i + 1}
													>
														{i + 1}
													</option>
												)
											)}
										</Form.Control>
									</Col>

									<Col md={2}>
										<Button
											type="button"
											variant="dark"
											onClick={(e) =>
												removeFromCartHandler(
													item.product
												)
											}
										>
											<i className="fas fa-trash" />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card className="my-2">
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h4>
								Subtotal (
								{cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)}
								) items
							</h4>
							₱
							{cartItems
								.reduce(
									(acc, item) => acc + item.price * item.qty,
									0
								)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								className="btn-block"
								disabled={!cartItems.length}
								onClick={checkOutHandler}
							>
								Check Out
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen

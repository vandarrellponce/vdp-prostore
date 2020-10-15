import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps.tsx/CheckoutSteps'
import Loader from '../components/Loader/Loader'
import { Link } from 'react-router-dom'
import createOrder from '../actions/order/createOrder'
import Message from '../components/Message/Message'

const PlaceOrderScreen = ({ history }) => {
	const { cartItems, paymentMethod } = useSelector((state) => state.cart)
	const { userInfo } = useSelector((state) => state.user)
	const { order, loading, createError } = useSelector((state) => state.order)
	const dispatch = useDispatch()

	//USE EFFECT
	useEffect(() => {
		if (order) history.push(`/orders/${order._id}/pay`)
	}, [order, history])

	// CALCULATE PRICES
	const itemsPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	)
	const shippingPrice = 100
	const taxPrice = Number((0.12 * itemsPrice).toFixed(2))
	const totalPrice = Math.floor(itemsPrice + shippingPrice + taxPrice)

	// FUNCTIONS AND HANDLERS
	function capitalize(s) {
		return s[0].toUpperCase() + s.slice(1)
	}
	const placeOrderHandler = async (e) => {
		e.preventDefault()
		await dispatch(
			createOrder({
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
				orderItems: cartItems,
				shippingAddress: userInfo.shippingAddress,
			})
		)
		/* history.push(`/orders/${order._id}`) */
	}

	if (!paymentMethod) history.push('/payment')
	if (!userInfo) return <Message children="Please log in to continue" />
	if (loading) return <Loader />
	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />

			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>SHIPPING</h3>
							<p>
								<strong>Address: </strong>
								{capitalize(
									userInfo.shippingAddress.street
								)}, {capitalize(userInfo.shippingAddress.sitio)}
								,{' '}
								{capitalize(userInfo.shippingAddress.barangay)},{' '}
								{capitalize(userInfo.shippingAddress.city)},
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h3>PAYMENT METHOD</h3>
							<p>
								<strong>Pay through: </strong>
								{paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h3>ORDER ITEMS</h3>
							<ListGroup variant="flush">
								{cartItems.map((item, i) => (
									<ListGroup.Item key={i}>
										<Row>
											<Col md={2}>
												<Image
													src={item.image}
													alt={item.name}
													fluid
													rounded
												/>
											</Col>
											<Col>
												<Link
													to={`/products/${item.product}`}
												>
													{item.name}
												</Link>
											</Col>
											<Col md={4}>
												{item.qty} x ₱{item.price} = ₱
												{item.qty * item.price}
											</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>₱{itemsPrice}</Col>
								</Row>
								<Row>
									<Col>Shipping</Col>
									<Col>₱{shippingPrice}</Col>
								</Row>
								<Row>
									<Col>Tax</Col>
									<Col>₱{taxPrice}</Col>
								</Row>
								<Row>
									<Col>Total</Col>
									<Col>₱{totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>

					<Card className="mt-5">
						<ListGroup variant="flush">
							<ListGroup.Item variant="danger">
								<h4>NOTICE FOR CASH ON DELIVERY</h4>
							</ListGroup.Item>

							<ListGroup.Item variant="danger">
								<p>
									{' '}
									Once order is placed, We will call you
									(mobile no. 09177102741) to verify your
									order, address, and delivery charge. Please
									keep your line open. Thank you.
								</p>
							</ListGroup.Item>
							<ListGroup.Item>
								{createError && (
									<Message
										children={createError}
										variant="danger"
									/>
								)}
							</ListGroup.Item>
							<ListGroup.Item variant="info">
								<strong>Status: Not yet verified</strong>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default PlaceOrderScreen

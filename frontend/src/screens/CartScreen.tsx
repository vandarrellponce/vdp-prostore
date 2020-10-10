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
import Form from 'react-bootstrap/'
import addToCart from '../actions/cart/addToCart'

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id
	const qty = location.search ? Number(location.search.split('=')[1]) : 1
	const { cartItems } = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	console.log(cartItems)
	useEffect(() => {
		if (productId) dispatch(addToCart(productId, qty))
	}, [dispatch, productId, qty])

	return <div>{match.params.id}</div>
}

export default CartScreen

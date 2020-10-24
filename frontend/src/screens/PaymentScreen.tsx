import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps.tsx/CheckoutSteps'
import savePaymentMethod from '../actions/cart/savePaymentMethod'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { Helmet } from 'react-helmet'

const PaymentScreen = ({ history }) => {
	const [paymentMethod, setPaymentMethod] = useState('')

	const dispatch = useDispatch()

	// USE EFFECT
	useEffect(() => {
		dispatch({ type: ORDER_PAY_RESET })
	}, [dispatch])

	// HANDLERS
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		history.push('/placeorder')
	}

	return (
		<FormContainer>
			<Helmet>
				<title>Pro Store | Payment Options</title>
				<meta name="description" content="We sell the best milk tea in town" />
			</Helmet>
			<CheckoutSteps step1 step2 step3 />
			<h1 style={{ marginBottom: '30px' }}>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>

					<Form.Check
						disabled
						type="radio"
						id="Paypal"
						value="Paypal"
						name="paymentMethod"
						label="Paypal/Credit Card (Temporarily Unavailable)"
						onChange={(e) => {
							setPaymentMethod(e.target.value)
						}}
					></Form.Check>

					<Form.Check
						type="radio"
						id="Cash on Delivery"
						value="Cash on Delivery"
						name="paymentMethod"
						label="Cash on Delivery"
						onChange={(e) => {
							setPaymentMethod(e.target.value)
						}}
					></Form.Check>
				</Form.Group>

				<Button type="submit" variant="secondary">
					Proceed
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen

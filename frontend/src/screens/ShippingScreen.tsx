import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer/FormContainer'
import { updateUser } from '../actions/users/updateUser'
import CheckoutSteps from '../components/CheckoutSteps.tsx/CheckoutSteps'

const ShippingScreen = ({ history }) => {
	const [street, setStreet] = useState('')
	const [sitio, setSitio] = useState('')
	const [barangay, setBaranggay] = useState('')
	const [city, setCity] = useState('')
	const [mobile, setMobile] = useState('')
	const dispatch = useDispatch()
	const { userInfo } = useSelector((state) => state.user)

	// USE EFFECT
	useEffect(() => {
		if (userInfo?.shippingAddress) {
			const {
				street,
				sitio,
				barangay,
				city,
				mobile,
			} = userInfo.shippingAddress
			setStreet(street)
			setSitio(sitio)
			setBaranggay(barangay)
			setCity(city)
			setMobile(mobile)
		}
	}, [userInfo])

	// HANDLERS
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateUser({
				shippingAddress: {
					street,
					sitio,
					barangay,
					city,
					mobile,
				},
			})
		).then(() => history.push('/payment'))
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping Address</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label id="street">
						Street / Compound / Residence
					</Form.Label>

					<Form.Control
						type="text"
						value={street}
						onChange={(e) => setStreet(e.target.value)}
						required
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="sitio">
					<Form.Label id="sitio">Sitio</Form.Label>

					<Form.Control
						type="text"
						value={sitio}
						onChange={(e) => setSitio(e.target.value)}
						required
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="barangay">
					<Form.Label id="barangay">Barangay</Form.Label>

					<Form.Control
						type="text"
						value={barangay}
						onChange={(e) => setBaranggay(e.target.value)}
						required
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="city">
					<Form.Label id="barangay">City</Form.Label>

					<Form.Control
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="mobile">
					<Form.Label id="mobile">Mobile Number</Form.Label>

					<Form.Control
						type="text"
						value={mobile}
						onChange={(e) => setMobile(e.target.value)}
						required
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="secondary">
					Proceed
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen

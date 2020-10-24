import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { loginUser } from '../actions/users/loginUser'
import FormContainer from '../components/FormContainer/FormContainer'
import { Helmet } from 'react-helmet'
import GoogleButton from 'react-google-button'
import Axios from 'axios'

const LoginScreen = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { userInfo, loading, loginError } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/'

	// HANDLERS
	const submitHandler = (e) => {
		e.preventDefault()

		dispatch(loginUser(email, password))
	}
	if (userInfo) props.history.push(redirect)

	return (
		<FormContainer>
			<a
				href="http://localhost:5000/auth/google"
				style={{ textDecoration: 'none' }}
			>
				{/* <a href="/auth/google" 
				style={{ textDecoration: 'none' }}> */}
				<GoogleButton
					type="dark"
					style={{ width: '100%', marginTop: '30px', marginBottom: '30px' }}
				/>
			</a>
			<Helmet>
				<title>Pro Store | Login</title>
				<meta name="description" content="We sell the best milk tea in town" />
			</Helmet>
			<h4>ADMIN LOGIN</h4>
			{loginError && <Message children={loginError} variant="info" />}

			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label id="email">Email Address</Form.Label>
					<Form.Control
						required
						type="email"
						value={email}
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label id="password">Password</Form.Label>
					<Form.Control
						required
						type="password"
						value={password}
						placeholder="Enter password"
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="secondary">
					Submit
				</Button>
			</Form>
			<br />

			{/* 	<Row className="py-3">
				<Col>
					New Customer?{' '}
					<Link to={`/register?redirect=${redirect}`}>Register</Link>
				</Col>
			</Row> */}
		</FormContainer>
	)
}

export default LoginScreen

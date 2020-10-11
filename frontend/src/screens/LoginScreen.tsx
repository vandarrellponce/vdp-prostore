import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { loginUser } from '../actions/users/loginUser'
import FormContainer from '../components/FormContainer/FormContainer'

const LoginScreen = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { userInfo, loading, error } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/'

	useEffect(() => {
		if (userInfo) props.history.push(redirect)
	}, [userInfo, redirect, props.history])

	// HANDLERS
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(loginUser(email, password))
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message children={error} variant="info" />}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						value={email}
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
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
			<Row className="py-3">
				<Col>
					New Customer?{' '}
					<Link to={`/register?redirect=${redirect}`}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen

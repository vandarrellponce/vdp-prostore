import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import registerUser from '../actions/users/registerUser'

const RegisterScreen = (props) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [formError, setFormError] = useState(null)
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
		let formPassed = true

		if (name === '') {
			setFormError('Please fill up the required fields')
			document.getElementById('name').textContent = '* Name is required'
			formPassed = false
		} else {
			document.getElementById('name').textContent = 'Name'
			formPassed = true
		}
		if (email === '') {
			setFormError('Please fill up the required fields')
			document.getElementById('email').textContent = '* Email is required'
			formPassed = false
		} else {
			document.getElementById('email').textContent = 'Email'
			formPassed = true
		}
		if (password === '') {
			setFormError('Please fill up the required fields')
			document.getElementById('password').textContent =
				'* Password is required'
			formPassed = false
		} else {
			document.getElementById('password').textContent = 'Password'
			formPassed = true
		}
		if (rePassword === '') {
			setFormError('Please fill up the required fields')
			document.getElementById('rePassword').textContent =
				'* Password is required'
			formPassed = false
		} else {
			document.getElementById('rePassword').textContent =
				'Re-type Password'
			formPassed = true
		}
		if (password !== rePassword) {
			setFormError('Password does not match')
			formPassed = false
		}

		if (formPassed) dispatch(registerUser(name, email, password))
	}

	return (
		<FormContainer>
			<h1>Creat Account</h1>
			{error && <Message children={error} variant="info" />}
			{formError && <Message children={formError} variant="danger" />}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label id="name">Name</Form.Label>
					<Form.Control
						type="text"
						value={name}
						placeholder="Enter name"
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="email">
					<Form.Label id="email">Email Address</Form.Label>
					<Form.Control
						type="email"
						value={email}
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label id="password">Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						placeholder="Enter password"
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="confirmPassword">
					<Form.Label id="rePassword">Re-type Password</Form.Label>
					<Form.Control
						type="password"
						value={rePassword}
						placeholder="Re-enter password"
						onChange={(e) => setRePassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="secondary">
					Submit
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Have already an account?{' '}
					<Link to={`/login?redirect=${redirect}`}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen

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
import getUserDetails from '../actions/users/getUserDetails'

const ProfileScreen = (props) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [formError, setFormError] = useState(null)

	const { userInfo: userDetail, loading, error } = useSelector(
		(state) => state.userDetails
	)

	const { userInfo: userFromLogin } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!userFromLogin) return props.history.push('/login')
		if (!userDetail) dispatch(getUserDetails('profile'))
		if (userDetail) {
			setName(userDetail.name)
			setEmail(userDetail.email)
		}
	}, [userFromLogin, props.history, dispatch, userDetail])

	// HANDLERS
	const submitHandler = (e) => {
		e.preventDefault()

		if (password !== rePassword)
			return setFormError('Password does not match')
		//dispatch()

		setFormError(null)
	}

	if (!userFromLogin) return <Loader />
	if (loading) return <Loader />
	if (!userDetail) return <Loader />
	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{error && <Message children={error} variant="info" />}
				{formError && <Message children={formError} variant="danger" />}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label id="name">Name</Form.Label>

						<Form.Control
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label id="email">Email Address</Form.Label>
						<Form.Control
							type="email"
							value={email}
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
						<Form.Label id="rePassword">
							Re-type Password
						</Form.Label>
						<Form.Control
							type="password"
							value={rePassword}
							placeholder="Re-enter password"
							onChange={(e) => setRePassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type="submit" variant="secondary">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen

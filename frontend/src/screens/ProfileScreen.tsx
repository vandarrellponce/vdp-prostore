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
import updateUserProfile from '../actions/users/updateUserProfile'
import { truncate } from 'fs'

const ProfileScreen = (props) => {
	const [name, setName] = useState('')
	/* const [email, setEmail] = useState('') */
	const [isChangePassword, setIsChangePassword] = useState(true)
	const [password, setPassword] = useState('')
	const [rePassword, setRePassword] = useState('')
	const [formError, setFormError] = useState(null)
	const dispatch = useDispatch()

	const { userInfo, loading, error } = useSelector((state) => state.user)

	// USE EFFECT
	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name)

			/* setEmail(userDetail.email) */
		}
	}, [userInfo, dispatch])

	// HANDLERS
	const submitHandler = (e) => {
		e.preventDefault()

		if (password !== rePassword)
			return setFormError('Password does not match')
		dispatch(
			updateUserProfile({
				name,

				password,
			})
		)

		setFormError(null)
	}

	if (!userInfo) props.history.push('/login')
	if (loading) return <Loader />
	return (
		<Row>
			<Col md={3}>
				{/* 	{success && (
					<Message
						children={
							'User profile updated, click here to refresh the page'
						}
						variant="success"
					/>
				)} */}

				{error && <Message children={error} variant="info" />}
				{formError && <Message children={formError} variant="danger" />}
				{loading && <Loader />}

				<h2>User Profile</h2>

				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label id="name">Name</Form.Label>

						<Form.Control
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					{/* <Form.Group controlId="email">
						<Form.Label id="email">Email Address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group> */}

					<Form.Group controlId="password">
						<Form.Label id="password">Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							placeholder="Enter new password"
							onChange={(e) => setPassword(e.target.value)}
							disabled={!isChangePassword}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label id="rePassword">
							Re-type Password
						</Form.Label>
						<Form.Control
							type="password"
							value={rePassword}
							placeholder="Re-enter new password"
							onChange={(e) => setRePassword(e.target.value)}
							disabled={!isChangePassword}
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

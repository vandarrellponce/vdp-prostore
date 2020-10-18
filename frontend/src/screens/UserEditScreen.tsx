import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import getUserDetails from '../actions/users/getUserDetails'
import { Link } from 'react-router-dom'
import { USER_DETAILS_SUCCESS } from '../constants/userConstants'
import { updateUserByAdmin } from '../actions/users/updateUser'

const UserEditScreen = ({ match, history, location }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)
	const { userDetails, loading, error } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	//USE EFFECT
	useEffect(() => {
		if (!userDetails) dispatch(getUserDetails(match.params.id))
		if (userDetails) {
			setName(userDetails.name)
			setEmail(userDetails.email)
			setIsAdmin(userDetails.isAdmin)
		}
	}, [dispatch, userDetails, match])

	// HANDLERS
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(updateUserByAdmin({ name, email, isAdmin }, match.params.id))
	}

	const handleBack = (e) => {
		e.preventDefault()
		history.push('/admin/userlist')
		dispatch({ type: USER_DETAILS_SUCCESS, payload: null })
	}

	return (
		<div>
			<Button className="btn btn-light my-3" onClick={handleBack}>
				Go Back
			</Button>

			<FormContainer>
				<h1>Edit User</h1>
				{error && <Message children={error} variant="info" />}
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

					<Form.Group controlId="email">
						<Form.Label id="email">Email Address</Form.Label>
						<Form.Check
							type="checkbox"
							label="Is Admin"
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
						></Form.Check>
					</Form.Group>

					<Button type="submit" variant="secondary">
						Update
					</Button>
				</Form>
			</FormContainer>
		</div>
	)
}

export default UserEditScreen

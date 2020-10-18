import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import getUserList from '../actions/users/getUserList'
import deleteUser from '../actions/users/deleteUser'

const UserListScreen = ({ history }) => {
	const {
		userInfo,
		userDeleteResponse,
		userList,
		userListLoading,
		userListError,
	} = useSelector((state) => state.user)
	const dispatch = useDispatch()

	// USE EFFECT
	useEffect(() => {
		dispatch(getUserList())
		if (userInfo && !userInfo.isAdmin) history.push('/')
	}, [dispatch, userDeleteResponse, userInfo, history])

	// HANDLERS
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure to delete the user?'))
			dispatch(deleteUser(id))
	}

	return (
		<div>
			<h1>Users</h1>
			{userListLoading ? (
				<Loader />
			) : userListError ? (
				<Message children={userListError} variant="danger" />
			) : (
				<Table striped hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{userList &&
							userList.map((user) => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>
										<a href={`mailto:${user.email}`}>
											{user.email}
										</a>
									</td>
									<td>
										{user.isAdmin ? (
											<i
												className="fas fa-check"
												style={{ color: 'green' }}
											></i>
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}
											></i>
										)}
									</td>
									<td>
										<div>
											<LinkContainer
												to={`/admin/user/${user._id}/edit`}
											>
												<Button
													variant="info"
													className="btn-sm"
												>
													<i className="fas fa-edit"></i>
												</Button>
											</LinkContainer>
											{'     '}
											<Button
												variant="danger"
												className="btn-sm"
												onClick={() =>
													deleteHandler(user._id)
												}
											>
												<i className="fas fa-trash"></i>
											</Button>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			)}
		</div>
	)
}

export default UserListScreen

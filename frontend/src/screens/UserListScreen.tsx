import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { Helmet } from 'react-helmet'
import Axios from 'axios'
import { getConfig } from '../utils/utils'
import Paginate from '../components/Paginate'

const UserListScreen = ({ history }) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [users, setUsers] = useState([])

	const [pageSize] = useState(8)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(null)

	const [deleteUserError, setDeleteUserError] = useState(null)
	const { userInfo } = useSelector((state) => state.user)

	const getUsers = (option) => {
		setLoading(true)
		Axios.post('/api/users', option, getConfig())
			.then((res) => {
				setLoading(false)
				setUsers(res.data.users)
				setTotalPages(res.data.totalPages)
			})
			.catch((error) => {
				setLoading(false)
				setError(
					error.response?.data?.message
						? error.response.data.message
						: error.message
				)
			})
	}

	// USE EFFECT
	useEffect(() => {
		getUsers({ pageSize, page })
		if (userInfo && !userInfo.isAdmin) history.push('/')
	}, [deleteUserError, userInfo, history, pageSize, page])

	// HANDLERS
	const deleteHandler = (id) => {
		if (window.confirm('Are you sure to delete the user?')) {
			setLoading(true)
			Axios.delete(`/api/users/${id}`, getConfig())
				.then((res) => {
					setLoading(false)
					getUsers({ pageSize, page })
				})
				.catch((error) => {
					setLoading(false)
					setDeleteUserError(
						error.response?.data?.message
							? error.response.data.message
							: error.message
					)
				})
		}
	}

	const handleSetPage = (page) => {
		setPage(page)
		const options = {
			pageSize,
			page,
		}
		getUsers(options)
	}

	if (!userInfo)
		return <Message>Please Log in as Admin, Or go back to home page</Message>

	return (
		<div>
			<Helmet>
				<title>Pro Store | User's List</title>
				<meta name="description" content="We sell the best milk tea in town" />
			</Helmet>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message children={error} variant="danger" />
			) : (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
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
							{users &&
								users.map((user) => (
									<tr key={user._id}>
										<td>{user._id}</td>
										<td>{user.name}</td>
										<td>
											<a href={`mailto:${user.email}`}>{user.email}</a>
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
												<LinkContainer to={`/admin/users/${user._id}/edit`}>
													<Button variant="info" className="btn-sm">
														<i className="fas fa-edit"></i>
													</Button>
												</LinkContainer>
												{'     '}
												<Button
													variant="danger"
													className="btn-sm"
													onClick={() => deleteHandler(user._id)}
												>
													<i className="fas fa-trash"></i>
												</Button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
					<Paginate
						totalPages={totalPages}
						setPage={handleSetPage}
						page={page}
					/>
				</div>
			)}
		</div>
	)
}

export default UserListScreen

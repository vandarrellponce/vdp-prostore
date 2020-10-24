import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import Axios from 'axios'
import { getConfig } from '../utils/utils'
import { Helmet } from 'react-helmet'
import Paginate from '../components/Paginate'

const UserListScreen = ({ history }) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [orders, setOrders] = useState([])

	const [pageSize] = useState(8)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(null)

	const { userInfo } = useSelector((state) => state.user)

	const getOrders = (options) => {
		setLoading(true)
		Axios.post('/api/admin/orders', options, getConfig())
			.then((res) => {
				setOrders(res.data.orders)
				setTotalPages(res.data.totalPages)
				setLoading(false)
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
		getOrders({ pageSize, page })
		if (userInfo && !userInfo.isAdmin) history.push('/')
	}, [userInfo, history, pageSize, page])

	// HANDLERS
	/* const deleteHandler = (id) => {} */
	const handleSetPage = (page) => {
		setPage(page)
		const options = {
			pageSize,
			page,
		}
		getOrders(options)
	}
	if (!userInfo)
		return <Message>Please Log in as Admin, Or go back to home page</Message>

	return (
		<div>
			<Helmet>
				<title>Pro Store | Order List</title>
				<meta name="description" content="We sell the best milk tea in town" />
			</Helmet>
			<h1>ORDERS</h1>
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
								<th>CLIENT NAME</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>COH</th>
								{/* 	<th>CHANGE</th> */}
								<th>PAID</th>
								<th>DELIVERED</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{orders &&
								orders.map((order) => (
									<tr key={order._id}>
										<td
											style={{
												wordWrap: 'break-word',
												minWidth: '100px',
												maxWidth: '100px',
												/* overflow: 'hidden', */
											}}
										>
											{order._id}
										</td>
										<td>{order.user.name}</td>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>₱{order.totalPrice}</td>
										<td>₱{order.cashOnHand}</td>
										{/* <td>₱{order.change}</td> */}

										<td>
											{order.isPaid ? (
												order.paidAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											{order.isDelivered ? (
												order.deliveredAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											<LinkContainer to={`/orders/${order._id}/pay`}>
												<Button variant="info" className="btn-sm">
													Details
												</Button>
											</LinkContainer>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
					<Paginate
						page={page}
						totalPages={totalPages}
						setPage={handleSetPage}
					/>
				</div>
			)}
		</div>
	)
}

export default UserListScreen

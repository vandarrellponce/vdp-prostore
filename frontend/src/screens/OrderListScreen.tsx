import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import Axios from 'axios'
import { getConfig } from '../utils/utils'

const UserListScreen = ({ history }) => {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const { userInfo } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	// USE EFFECT
	useEffect(() => {
		setLoading(true)
		Axios.get('/api/admin/orders', getConfig())
			.then((res) => {
				setOrders(res.data)
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
		if (userInfo && !userInfo.isAdmin) history.push('/')
	}, [dispatch, userInfo, history])

	// HANDLERS
	const deleteHandler = (id) => {}
	if (!userInfo)
		return <Message>Please Log in as Admin, Or go back to home page</Message>

	return (
		<div>
			<h1>ORDERS</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message children={error} variant="danger" />
			) : (
				<Table striped hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>CUSTOMER NAME</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders &&
							orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.user.name}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>₱{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }}></i>
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
			)}
		</div>
	)
}

export default UserListScreen

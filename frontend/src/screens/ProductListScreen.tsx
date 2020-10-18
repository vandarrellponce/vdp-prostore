import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import getProductList from '../actions/products/productListActions'
import Axios from 'axios'
import { getConfig } from '../utils/utils'

const ProductListScreen = ({ history, match }) => {
	const [deleteError, setDeleteError] = useState('')
	const { userInfo } = useSelector((state) => state.user)
	const { products, loading, error } = useSelector(
		(state) => state.productList
	)
	const dispatch = useDispatch()

	// USE EFFECT
	useEffect(() => {
		dispatch(getProductList())
		if (userInfo && !userInfo.isAdmin) history.push('/')
	}, [dispatch, userInfo, history])

	// HANDLERS
	const deleteHandler = async (id) => {
		try {
			if (window.confirm('Are you sure to delete this product?')) {
				const config = getConfig()
				await Axios.delete(`/api/admin/products/${id}`, config)
				dispatch(getProductList())
			}
		} catch (error) {
			setDeleteError(error.message)
		}
	}
	const createProductHandler = (e) => {}

	if (!userInfo)
		return (
			<Message>Please Log in as Admin, Or go back to home page</Message>
		)
	if (deleteError) return <Message children={deleteError} variant="warning" />
	return (
		<div>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i>
						Create Product
					</Button>
				</Col>
			</Row>

			{loading ? (
				<Loader />
			) : error ? (
				<Message children={error} variant="danger" />
			) : (
				<Table striped hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products &&
							products.map((product) => {
								return (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>{product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td>
											<LinkContainer
												to={`/admin/products/${product._id}/edit`}
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
													deleteHandler(product._id)
												}
											>
												<i className="fas fa-trash"></i>
											</Button>
										</td>
									</tr>
								)
							})}
					</tbody>
				</Table>
			)}
		</div>
	)
}

export default ProductListScreen

import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import Axios from 'axios'
import { getConfig } from '../utils/utils'

const ProductEditScreen = ({ match, history }) => {
	const [product, setProduct] = useState({
		name: '',
		category: '',
		brand: '',
		description: '',
		price: '',
		countInStock: '',
		image: '',
	})
	const [isCreateProduct, setIsCreateProduct] = useState(true)
	const [uploading, setUploading] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const { userInfo } = useSelector((state) => state.user)

	const dispatch = useDispatch()
	const productId = match.params.id

	//USE EFFECT
	useEffect(() => {
		if (productId !== 'createProduct') {
			setIsCreateProduct(false)
			setLoading(true)
			Axios.get(`/api/products/${productId}`)
				.then((res) => {
					setLoading(false)
					setProduct(res.data)
				})
				.catch((error) =>
					setError(
						error.response?.data?.message
							? error.response.data.message
							: error.message
					)
				)
		}
	}, [dispatch, match])

	// HANDLERS
	const submitHandler = (e) => {
		e.preventDefault()

		// IF CREATE NEW PRODUCT
		if (isCreateProduct) {
			const newProduct = {
				...product,
				user: userInfo._id,
			}

			setLoading(true)
			Axios.post('/api/admin/products', newProduct, getConfig())
				.then((res) => {
					setLoading(false)

					history.push(`/admin/products/${res.data._id}/edit`)
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
		// IF EDIT PRODUCT
		if (!isCreateProduct) {
			const updatedProduct = {
				name: product.name,
				category: product.category,
				brand: product.brand,
				description: product.description,
				price: product.price,
				countInStock: product.countInStock,
				image: product.image,
			}
			setLoading(true)

			Axios.put(`/api/admin/products/${productId}`, updatedProduct, getConfig())
				.then((res) => {
					setLoading(false)
					setProduct(res.data)
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
	}

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)

		setUploading(true)

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
			},
		}

		try {
			const imageUrl = await (
				await Axios.post('/api/uploads', formData, config)
			).data
			setProduct({ ...product, image: imageUrl })
			setUploading(false)
		} catch (error) {
			setUploading(false)
			setError(
				error.response?.data?.message
					? error.response.data.message
					: error.message
			)
		}
	}

	const handleBack = (e) => {
		e.preventDefault()
		history.push('/admin/productlist')
	}

	return (
		<div>
			<Button className="btn btn-light my-3" onClick={handleBack}>
				Go Back
			</Button>

			<FormContainer>
				<h1>{isCreateProduct ? 'Create Product' : 'Edit Product'}</h1>
				{error && <Message children={error} variant="info" />}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={product.name}
							placeholder="Enter name"
							onChange={(e) => setProduct({ ...product, name: e.target.value })}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Price</Form.Label>
						<Form.Control
							type="number"
							value={product.price}
							placeholder="Enter price"
							onChange={(e) =>
								setProduct({ ...product, price: e.target.value })
							}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Image</Form.Label>
						<Form.Control
							type="text"
							value={product.image}
							placeholder="Enter image url"
							onChange={(e) =>
								setProduct({ ...product, image: e.target.value })
							}
						></Form.Control>
						<Form.File
							id="image-file"
							label="Choose File"
							custom
							onChange={uploadFileHandler}
						></Form.File>
						{uploading && <Loader />}
					</Form.Group>

					<Form.Group>
						<Form.Label>Brand</Form.Label>
						<Form.Control
							type="text"
							value={product.brand}
							placeholder="Enter brand"
							onChange={(e) =>
								setProduct({ ...product, brand: e.target.value })
							}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Category</Form.Label>
						<Form.Control
							type="text"
							value={product.category}
							placeholder="Enter category"
							onChange={(e) =>
								setProduct({ ...product, category: e.target.value })
							}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Count in Stock</Form.Label>
						<Form.Control
							type="number"
							value={product.countInStock}
							placeholder="Enter count in stock"
							onChange={(e) =>
								setProduct({ ...product, countInStock: e.target.value })
							}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="text"
							value={product.description}
							placeholder="Enter description"
							onChange={(e) =>
								setProduct({ ...product, description: e.target.value })
							}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="secondary">
						Submit
					</Button>
				</Form>
			</FormContainer>
		</div>
	)
}

export default ProductEditScreen

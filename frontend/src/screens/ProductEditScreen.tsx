import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import Axios from 'axios'

const ProductEditScreen = ({ match, history, location }) => {
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState('')
	const [description, setDescription] = useState('')
	const [isCreateProduct, setIsCreateProduct] = useState(true)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const dispatch = useDispatch()

	//USE EFFECT
	useEffect(() => {
		const productId = match.params.id
		if (productId !== 'createProduct') {
			setIsCreateProduct(false)
			setLoading(true)
			Axios.get(`/api/products/${productId}`)
				.then((res) => {
					setLoading(false)
					const product = res.data
					setName(product.name)
					setPrice(product.price)
					setImage(product.image)
					setBrand(product.brand)
					setCategory(product.category)
					setCountInStock(product.countInStock)
					setDescription(product.description)
				})
				.catch((e) => setError(e.message))
		}
	}, [dispatch, match])

	// HANDLERS
	const submitHandler = (e) => {
		e.preventDefault()
		if (isCreateProduct) {
		}
		if (!isCreateProduct) {
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
							value={name}
							placeholder="Enter name"
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Price</Form.Label>
						<Form.Control
							type="number"
							value={price}
							placeholder="Enter price"
							onChange={(e) => setPrice(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Image</Form.Label>
						<Form.Control
							type="text"
							value={image}
							placeholder="Enter image url"
							onChange={(e) => setImage(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Brand</Form.Label>
						<Form.Control
							type="text"
							value={brand}
							placeholder="Enter brand"
							onChange={(e) => setBrand(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Category</Form.Label>
						<Form.Control
							type="text"
							value={category}
							placeholder="Enter category"
							onChange={(e) => setCategory(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Count in Stock</Form.Label>
						<Form.Control
							type="number"
							value={countInStock}
							placeholder="Enter count in stock"
							onChange={(e) => setCountInStock(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="text"
							value={description}
							placeholder="Enter description"
							onChange={(e) => setDescription(e.target.value)}
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

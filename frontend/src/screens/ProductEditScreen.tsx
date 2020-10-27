import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import Axios from 'axios'
import { getConfig } from '../utils/utils'
import { Helmet } from 'react-helmet'
import { Col, Row } from 'react-bootstrap'

const ProductEditScreen = ({ match, history }) => {
	const [product, setProduct] = useState({
		name: '',
		category: 'Drinks',
		brand: 'Category',
		description: '',
		price: '',
		countInStock: '',
		image: '',
		sizes: [],
		addons: [],
	})
	const [sizeName, setSizeName] = useState('')
	const [sizePrice, setSizePrice] = useState('')
	const [addonName, setAddonName] = useState('')
	const [addonPrice, setAddonPrice] = useState('')

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
	}, [dispatch, match, productId])

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
				sizes: product.sizes,
				addons: product.addons,
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
		<div className="py-3">
			<Helmet>
				<title>Kumbatea! | Edit Product</title>
				<meta name="description" content="We sell the best milk tea in town" />
			</Helmet>
			<Button className="btn btn-light my-3" onClick={handleBack}>
				Go Back
			</Button>
			<h1>{isCreateProduct ? 'Create Product' : 'Edit Product'}</h1>
			{error && <Message children={error} variant="info" />}
			{loading && <Loader />}
			<Row>
				<Col md={4}>
					<Form onSubmit={submitHandler}>
						{/* NAME */}
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								size="sm"
								type="text"
								value={product.name}
								placeholder="Enter name"
								onChange={(e) =>
									setProduct({ ...product, name: e.target.value })
								}
							></Form.Control>
						</Form.Group>

						{/* PRICE */}
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control
								size="sm"
								type="number"
								value={product.price}
								placeholder="Enter price"
								onChange={(e) =>
									setProduct({ ...product, price: e.target.value })
								}
							></Form.Control>
						</Form.Group>

						{/* SIZES */}
						<Form.Label>Sizes</Form.Label>
						{product.sizes.length > 0 &&
							product.sizes.map((size, i) => (
								<Row key={i}>
									<Col className="my-1" xs={5} md={5}>
										<Form.Control
											readOnly
											size="sm"
											type="text"
											value={size.name}
										></Form.Control>
									</Col>
									<Col className="my-1" xs={5} md={5}>
										<Form.Control
											readOnly
											size="sm"
											type="number"
											value={size.price}
										></Form.Control>
									</Col>
									<Col xs={2} md={2} className="my-1">
										<Button
											size="sm"
											onClick={(e) => {
												setProduct({
													...product,
													sizes: product.sizes.filter((s) => s !== size),
												})
											}}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							))}

						{/* SIZES FORM */}
						<Form.Group>
							<Row>
								<Col>
									<Form.Control
										size="sm"
										type="text"
										value={sizeName}
										placeholder="Enter name"
										onChange={(e) => setSizeName(e.target.value)}
									></Form.Control>
								</Col>
								<Col>
									<Form.Control
										size="sm"
										type="number"
										value={sizePrice}
										placeholder="Enter price"
										onChange={(e) => setSizePrice(e.target.value)}
									></Form.Control>
								</Col>
							</Row>
							<Button
								className="my-1"
								size="sm"
								onClick={(e) => {
									setProduct({
										...product,
										sizes: [
											...product.sizes,
											{ name: sizeName, price: sizePrice },
										],
									})
									setSizeName('')
									setSizePrice('')
								}}
							>
								Add
							</Button>
						</Form.Group>

						{/* ADD ONS */}
						<Form.Label>Add ons</Form.Label>
						{product.addons.length > 0 &&
							product.addons.map((addon, i) => (
								<Row key={i}>
									<Col className="my-1" xs={5} md={5}>
										<Form.Control
											readOnly
											size="sm"
											type="text"
											value={addon.name}
										></Form.Control>
									</Col>
									<Col className="my-1" xs={5} md={5}>
										<Form.Control
											readOnly
											size="sm"
											type="number"
											value={addon.price}
										></Form.Control>
									</Col>
									<Col xs={2} md={2} className="my-1">
										<Button
											size="sm"
											onClick={(e) => {
												setProduct({
													...product,
													addons: product.addons.filter((a) => a !== addon),
												})
											}}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							))}

						{/* ADD ON FORMS */}
						<Form.Group>
							<Row>
								<Col>
									<Form.Control
										size="sm"
										type="text"
										value={addonName}
										placeholder="Enter name"
										onChange={(e) => setAddonName(e.target.value)}
									></Form.Control>
								</Col>
								<Col>
									<Form.Control
										size="sm"
										type="number"
										value={addonPrice}
										placeholder="Enter price"
										onChange={(e) => setAddonPrice(e.target.value)}
									></Form.Control>
								</Col>
							</Row>
							<Button
								className="my-1"
								size="sm"
								onClick={(e) => {
									setProduct({
										...product,
										addons: [
											...product.addons,
											{ name: addonName, price: addonPrice },
										],
									})
									setAddonName('')
									setAddonPrice('')
								}}
							>
								Add
							</Button>
						</Form.Group>
					</Form>
				</Col>
				<Col md={4}>
					{/* IMAGE FORM */}
					<Form.Group>
						<Form.Label>Image</Form.Label>
						<Form.Control
							size="sm"
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
							size="sm"
							as="select"
							value={product.brand}
							placeholder="Enter brand"
							onChange={(e) =>
								setProduct({ ...product, brand: e.target.value })
							}
						>
							<option value="Kumbatea">Kumbatea</option>
							<option value="Assorted">Assorted</option>
						</Form.Control>
					</Form.Group>
				</Col>

				{/* CATEGORY */}
				<Col md={4}>
					<Form.Group>
						<Form.Label>Category</Form.Label>
						<Form.Control
							size="sm"
							value={product.category}
							as="select"
							onChange={(e) =>
								setProduct({ ...product, category: e.target.value })
							}
						>
							<option value="Drinks">Drinks</option>
							<option value="Chips">Chips</option>
						</Form.Control>
					</Form.Group>

					{/* COUNT IN STOCKS */}
					<Form.Group>
						<Form.Label>Count in Stock</Form.Label>
						<Form.Control
							size="sm"
							type="number"
							value={product.countInStock}
							placeholder="Enter count in stock"
							onChange={(e) =>
								setProduct({ ...product, countInStock: e.target.value })
							}
						></Form.Control>
					</Form.Group>

					{/* DESCRIPTION */}
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							size="sm"
							type="text"
							value={product.description}
							placeholder="Enter description"
							onChange={(e) =>
								setProduct({ ...product, description: e.target.value })
							}
						></Form.Control>
					</Form.Group>

					{/* UPDATE BUTTON / CREATE BUTTON */}
					<Button
						type="submit"
						variant="info"
						size="sm"
						onClick={submitHandler}
					>
						Submit Product
					</Button>
				</Col>
			</Row>
		</div>
	)
}

export default ProductEditScreen

import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc	Fetch all Products
// @route	GET /api/products
// @access	Public
export const getProducts = expressAsyncHandler(async (req, res) => {
	const products = await Product.find({})
	/* throw new Error('Not Authorized') */
	res.send(products)
})

// @desc	Fetch single product
// @route	GET /api/products/:id
// @access	Public
export const getProductById = expressAsyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (!product) throw new Error('Product not found')
	res.send(product)
})

// @desc	Delete product by id
// @route	DELETE /api/admin/products/:id
// @access	Private/Admin
export const deleteProduct = expressAsyncHandler(async (req, res) => {
	const deletedProduct = await Product.findOneAndDelete({
		_id: req.params.id,
	})
	if (!deletedProduct) throw new Error('No such product id found')
	res.send(deletedProduct)
})

// @desc	Update product by id
// @route	PUT /api/admin/products/:id
// @access	Private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = [
		'name',
		'category',
		'brand',
		'description',
		'price',
		'countInStock',
		'image',
	]
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	)

	if (!isValidOperation)
		return res
			.status(400)
			.send({ error: 'Updating invalid field is not allowed!' })
	try {
		const id = req.params.id
		const product = await Product.findById(id)
		if (!product) throw new Error('Product not found')
		updates.forEach((update) => (product[update] = req.body[update]))
		const updatedProduct = await user.save()
		res.send(updatedProduct)
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})

// @desc	Create product
// @route	POST /api/admin/products
// @access	Private/Admin
export const createProduct = expressAsyncHandler(async (req, res) => {
	try {
		const product = new Product(req.body)
		const newProduct = await product.save()
		res.status(201).send(newProduct)
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})

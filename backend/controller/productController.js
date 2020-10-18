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

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

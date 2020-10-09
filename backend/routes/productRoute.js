import express from 'express'
const router = express.Router()
import products from '../data/products.js'

router.get('/api/products', (req, res) => {
	res.send(products)
})

router.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id)
	res.send(product)
})

export default router

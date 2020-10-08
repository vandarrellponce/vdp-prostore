const express = require('express')
const router = express.Router()
const products = require('../data/products')

router.get('/api/products', (req, res) => {
	res.send(products)
})

router.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id)
	res.send(product)
})

module.exports = router

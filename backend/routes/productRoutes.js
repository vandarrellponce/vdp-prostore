import express from 'express'
import {
	createReview,
	getProductById,
	getProducts,
	getProductsWithOptions,
} from '../controller/productController.js'
import auth from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(getProductsWithOptions)

router.route('/:id').get(getProductById)
router.route('/:id/reviews').post(auth, createReview)

export default router

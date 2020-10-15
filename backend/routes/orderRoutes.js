import express from 'express'
import {
	createOrder,
	getOrderById,
	updateOrderToPaid,
} from '../controller/orderController.js'
const router = express.Router()
import auth from '../middlewares/authMiddleware.js'

router.route('/').post(auth, createOrder)
router.route('/:orderId').get(auth, getOrderById)
router.route('/:orderId/pay').put(auth, updateOrderToPaid)

export default router

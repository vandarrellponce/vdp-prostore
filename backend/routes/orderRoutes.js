import express from 'express'
import {
	createOrder,
	getOrderById,
	getUserOrders,
	updateOrderToPaid,
} from '../controller/orderController.js'
const router = express.Router()
import auth from '../middlewares/authMiddleware.js'

router.route('/myorders').get(auth, getUserOrders)
router.route('/').post(auth, createOrder)
router.route('/:orderId').get(auth, getOrderById)
router.route('/:orderId/pay').put(auth, updateOrderToPaid)

export default router

import express from 'express'
import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid
} from '../controller/orderController.js'
import admin from '../middlewares/adminMiddleware.js'
const router = express.Router()
import auth from '../middlewares/authMiddleware.js'

router.route('/myorders').post(auth, getUserOrders)
router.route('/').post(auth, createOrder)
router.route('/:orderId').get(auth, getOrderById)
router.route('/:orderId/pay').put(auth, updateOrderToPaid)
router.route('/:orderId/deliver').put(auth, admin, updateOrderToDelivered)

export default router

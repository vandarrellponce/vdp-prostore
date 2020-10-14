import express from 'express'
import { createOrder, getOrderById } from '../controller/orderController.js'
const router = express.Router()
import auth from '../middlewares/authMiddleware.js'

router.route('/').post(auth, createOrder)
router.route('/:orderId').get(auth, getOrderById)

export default router

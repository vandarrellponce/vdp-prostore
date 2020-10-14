import express from 'express'
import { createOrder } from '../controller/orderController.js'
const router = express.Router()
import auth from '../middlewares/authMiddleware.js'

router.route('/').post(auth, createOrder)

export default router

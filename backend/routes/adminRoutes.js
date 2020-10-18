import express from 'express'
import { deleteProduct } from '../controller/productController.js'
import {
	deleteUser,
	getUser,
	updateUser,
	createProduct,
} from '../controller/userController.js'
import admin from '../middlewares/adminMiddleware.js'
import auth from '../middlewares/authMiddleware.js'
const router = express.Router()

router
	.route('/users/:id')
	.delete(auth, admin, deleteUser)
	.get(auth, admin, getUser)
	.put(auth, admin, updateUser)

router.route('/products').post(auth, admin, createProduct)
router
	.route('/products/:id')
	.delete(auth, admin, deleteProduct)
	.put(auth, admin, updateUser)

export default router

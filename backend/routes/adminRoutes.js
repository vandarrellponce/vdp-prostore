import express from 'express'
import {
	createProduct,
	deleteProduct,
	updateProduct,
} from '../controller/productController.js'
import {
	deleteUser,
	getUser,
	updateUser,
} from '../controller/userController.js'
import admin from '../middlewares/adminMiddleware.js'
import auth from '../middlewares/authMiddleware.js'
const router = express.Router()
router.route('/products').post(auth, admin, createProduct)
router
	.route('/users/:id')
	.delete(auth, admin, deleteUser)
	.get(auth, admin, getUser)
	.put(auth, admin, updateUser)

router
	.route('/products/:id')
	.delete(auth, admin, deleteProduct)
	.put(auth, admin, updateProduct)

export default router

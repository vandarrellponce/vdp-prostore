import express from 'express'
const router = express.Router()
import {
	authUser,
	createUser,
	getUserProfile,
} from '../controller/userController.js'
import auth from '../middlewares/authMiddleware.js'

router.post('/login', authUser)
router.post('/signup', createUser)
router.route('/profile').get(auth, getUserProfile)

export default router

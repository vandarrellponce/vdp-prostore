import express from 'express'
const router = express.Router()
import {
	authUser,
	createUser,
	deleteUser,
	getUser,
	getUserProfile,
	getUsers,
	logoutAllUserSession,
	logoutUser,
	updateUser,
	updateUserProfile,
} from '../controller/userController.js'
import auth from '../middlewares/authMiddleware.js'
import admin from '../middlewares/adminMiddleware.js'

router.post('/login', authUser)
router.post('/register', createUser)
router.get('/logout', auth, logoutUser)
router.get('/logoutall', auth, logoutAllUserSession)
// prettier-ignore
router.route('/profile')
    .get(auth, getUserProfile)
	.put(auth, updateUserProfile)

router.route('/').get(auth, admin, getUsers)

export default router

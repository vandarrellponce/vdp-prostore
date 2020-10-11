import express from 'express'
const router = express.Router()
import {
	authUser,
	createUser,
	getUserProfile,
	logoutAllUserSession,
	logoutUser,
} from '../controller/userController.js'
import auth from '../middlewares/authMiddleware.js'

router.post('/login', authUser)
router.post('/register', createUser)
router.get('/logout', auth, logoutUser)
router.get('/logoutall', auth, logoutAllUserSession)
router.route('/profile').get(auth, getUserProfile)

export default router

import express from 'express'
const router = express.Router()
import {
	authUser,
	createUser,
	getUserProfile,
	logoutAllUserSession,
	logoutUser,
	updateUserProfile,
} from '../controller/userController.js'
import auth from '../middlewares/authMiddleware.js'

router.post('/login', authUser)
router.post('/register', createUser)
router.get('/logout', auth, logoutUser)
router.get('/logoutall', auth, logoutAllUserSession)
// prettier-ignore
router.route('/profile')
    .get(auth, getUserProfile)
    .put(auth, updateUserProfile)

export default router

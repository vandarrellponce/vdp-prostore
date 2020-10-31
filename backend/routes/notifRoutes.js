import express from 'express'
import {
	getNotifsAdmin,
	getNotifsUser,
	updateNotifToViewed,
} from '../controller/notifController.js'
import admin from '../middlewares/adminMiddleware.js'
import auth from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/admin').get(auth, admin, getNotifsAdmin)
router.route('/user/:id').get(auth, getNotifsUser)
router.route('/:id').put(auth, updateNotifToViewed)

export default router

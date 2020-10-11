import express from 'express'
const router = express.Router()
import { authUser, createUser } from '../controller/userController.js'

router.post('/login', authUser)
router.post('/signup', createUser)

export default router

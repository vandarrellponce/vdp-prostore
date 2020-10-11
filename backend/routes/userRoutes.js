import express from 'express'
const router = express.Router()
import { authUser } from '../controller/userController.js'

router.post('/login', authUser)

export default router

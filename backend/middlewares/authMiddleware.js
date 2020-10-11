import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userModel'
dotenv.config()

const auth = expressAsyncHandler(async (req, res, next) => {
	try {
		// Retrieve token from the header
		const token = req.header('Authorization').replace('Bearer ', '')

		// Verify if token is valid
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		// Check the user's tokens array, check if the token still exists
		const user = await User.findOne({
			_id: decoded._id,
			'tokens.token': token,
		})
		if (!user) throw new Error('invalid token')

		req.token = token
		req.user = user
		next()
	} catch (error) {
		res.status(401)
		throw new Error('Please authenticate to proceed')
	}
})

export default auth

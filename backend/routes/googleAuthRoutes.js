import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import passport from 'passport'
import User from '../models/userModel.js'

const router = express.Router()

// GET /auth/google
router.get(
	'/',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
)

// GET /auth/google/redirect
router.get('/redirect', passport.authenticate('google'), async (req, res) => {
	try {
		// Check if user with given email exists, then log in
		const user = await User.findOne({ email: req.user._json.email })
		if (user) {
			const token = await user.generateAuthToken()
			return (
				res
					.cookie('x_token', token)
					.status(200)
					/* .redirect('http://localhost:3000/') */
					.redirect('/')
			)
		}
		// If does not exist, proceed on creating user
		const newUser = await new User({
			name: req.user._json.name,
			email: req.user._json.email,
		}).save()
		const token = await newUser.generateAuthToken()
		res.cookie('x_token', token).status(201).redirect('/')
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})

export default router

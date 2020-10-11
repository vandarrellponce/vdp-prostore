import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc	Login user and get token
// @route	Post /api/users/login
// @access	Public
export const authUser = expressAsyncHandler(async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		)
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})
// @desc	Create user and get token
// @route	Post /api/users/login
// @access	Public
export const createUser = expressAsyncHandler(async (req, res) => {
	try {
		const newUser = await new User(req.body).save()
		const token = await newUser.generateAuthToken()
		res.status(201).send({ user: newUser, token })
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})

/* // @desc	Logout user and remove token
// @route	Post /api/users/logout
// @access	Public
export const logoutUser = expressAsyncHandler(async(req, res) => {
	try {
		
	} catch (error) {
		
	}
}) */

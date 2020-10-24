import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc	Login user and generate token
// @route	Post /api/users/login
// @access	Public
export const authUser = expressAsyncHandler(async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.cookie('x_token', token).status(200).send({ user, token })
	} catch (error) {
		res.status(401)
		throw new Error(error.message)
	}
})
// @desc	Create user and generate token
// @route	Post /api/users/login
// @access	Public
export const createUser = expressAsyncHandler(async (req, res) => {
	try {
		// Check if user with given email exists, if does throw error
		const user = await User.findOne({ email: req.body.email })
		if (user) {
			res.status(400)
			throw new Error('Email already in use')
		}
		// If does not exist, proceed on creating user
		const newUser = await new User(req.body).save()
		const token = await newUser.generateAuthToken()
		res.cookie('x_token', token).status(201).send({ user: newUser, token })
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})
// @desc	Logout user and remove token
// @route	Post /api/users/logout
// @access	Private
export const logoutUser = expressAsyncHandler(async (req, res) => {
	try {
		const tokens = req.user.tokens
		req.user.tokens = tokens.filter((token) => token.token !== req.token)
		await req.user.save()
		res.send({ status: 'Logout successful' })
	} catch (error) {
		res.status(500)
		throw new Error(error.message)
	}
})
// @desc	Logout all user's session
// @route	Post /api/users/logoutall
// @access	Private
export const logoutAllUserSession = expressAsyncHandler(async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send({ status: 'Logged out from all sessions' })
	} catch (error) {
		res.status(500)
		throw new Error(error.message)
	}
})
// @desc	Get user profile
// @route	Post /api/users/profile
// @access	Private
export const getUserProfile = expressAsyncHandler(async (req, res) => {
	try {
		res.send(req.user)
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})
// @desc	Update user profile
// @route	PUT /api/users/profile
// @access	Private
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'shippingAddress']
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	)

	if (!isValidOperation)
		return res
			.status(400)
			.send({ error: 'Updating invalid field is not allowed!' })
	try {
		const user = req.user
		updates.forEach((update) => (user[update] = req.body[update]))
		const savedUser = await user.save()
		/* const user = await User.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true
            }) */
		res.send(savedUser)
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})

// @desc	get all users
// @route	POST /api/users
// @access	Private/Admin
export const getUsers = expressAsyncHandler(async (req, res) => {
	const pageSize = req.body.pageSize || 8
	const page = req.body.page || 1
	try {
		const users = await User.find({})
			.limit(pageSize)
			.skip(pageSize * (page - 1))
			.sort({ createdAt: -1 })
		const count = await User.countDocuments({})
		res.send({ users, page, totalPages: Math.ceil(count / pageSize) })
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})

// @desc	Delete User by ID
// @route	DELETE /api/admin/users/:id
// @access	Private/Admin
export const deleteUser = expressAsyncHandler(async (req, res) => {
	try {
		const id = req.params.id
		await User.findOneAndDelete({ _id: id })
		res.send({ message: 'User removed' })
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})

// @desc	Get User by ID
// @route	GET /api/admin/users/:id
// @access	Private/Admin
export const getUser = expressAsyncHandler(async (req, res) => {
	try {
		const id = req.params.id
		const theUser = await User.findById(id)
		res.send(theUser)
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})

// @desc	Update User
// @route	PUT /api/admin/users/:id
// @access	Private/Admin
export const updateUser = expressAsyncHandler(async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'shippingAddress', 'isAdmin']
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	)

	if (!isValidOperation)
		return res
			.status(400)
			.send({ error: 'Updating invalid field is not allowed!' })
	try {
		const id = req.params.id
		const user = await User.findById(id)
		updates.forEach((update) => (user[update] = req.body[update]))
		const savedUser = await user.save()
		res.send(savedUser)
	} catch (error) {
		res.status(404)
		throw new Error(error.message)
	}
})

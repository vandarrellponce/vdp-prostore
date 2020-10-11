import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc	Auth user and get token
// @route	Post /api/users/login
// @access	Public
export const authUser = expressAsyncHandler(async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		)
		const token = await user.generateAuthToken()

		res.send({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: token,
		})
	} catch (err) {
		res.status(404).send(err.message)
	}
})

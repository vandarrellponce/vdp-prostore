import expressAsyncHandler from 'express-async-handler'

const admin = expressAsyncHandler(async (req, res, next) => {
	if (req.user && req.user.isAdmin) return next()
	res.status(401)
	throw new Error('Not authorized as an admin')
})

export default admin

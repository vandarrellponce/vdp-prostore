import expressAsyncHandler from 'express-async-handler'
import Notif from '../models/notifiModel.js'

// @desc	Get admin notifications
// @route	Get /api/notifications/admin
// @access	Private, admin
export const getNotifsAdmin = expressAsyncHandler(async (req, res) => {
	const limit = req.query.limit
	const skip = req.query.skip
	try {
		const notifs = await Notif.find({ target: 'admin', isViewed: false })
			.limit(Number(limit))
			.skip(Number(skip))
			.sort({ createdAt: -1 })
		const count = await Notif.countDocuments({ isViewed: false })
		res.send({ notifs, count })
	} catch (error) {
		console.log(error.message)
		res.status(401)
		throw new Error(error.message)
	}
})

// @desc	Update notification to viewed
// @route	PUT /api/notifications/:id
// @access	Private
export const updateNotifToViewed = expressAsyncHandler(async (req, res) => {
	try {
		const notif = await Notif.findById(req.params.id)
		notif.isViewed = true
		const updatedNotif = await notif.save()

		const io = req.app.get('socketio')
		io.emit('updateNotification')

		res.send(updatedNotif)
	} catch (error) {
		res.status(401)
		throw new Error(error.message)
	}
})

// @desc	Get user notifications by user id
// @route	Get /api/notifications/user/:id
// @access	Private, admin
export const getNotifsUser = expressAsyncHandler(async (req, res) => {
	try {
	} catch (error) {
		res.status(401)
		throw new Error(error.message)
	}
})

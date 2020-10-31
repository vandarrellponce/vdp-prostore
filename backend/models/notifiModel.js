import mongoose from 'mongoose'

const notifSchema = mongoose.Schema(
	{
		target: { type: String, required: true }, // ex. user, admin (all admin)
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		message: { type: String, required: true },
		payload: { type: mongoose.Schema.Types.ObjectId, required: true },
		isViewed: { type: Boolean, required: true, default: false },
		/* kind: { type: String, required: true }, // newOrder, updateOrder, newProduct */
	},
	{ timestamps: true }
)

const Notif = mongoose.model('Notification', notifSchema)

export default Notif

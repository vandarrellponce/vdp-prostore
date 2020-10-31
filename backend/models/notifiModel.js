import mongoose from 'mongoose'

const notifSchema = mongoose.Schema(
	{
		target: { type: String, required: true }, // ex. user, admin (all admin)
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		message: { type: String, required: true },
		payload: { type: String, required: true },
		/* kind: { type: String, required: true }, // newOrder, updateOrder, newProduct */
	},
	{ timestamps: true }
)

const Notif = mongoose.Model('notifications', notifSchema)

export default Notif

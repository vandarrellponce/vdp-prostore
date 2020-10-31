import mongoose from 'mongoose'

const notifSchema = mongoose.Schema(
	{
		target: { type: String, required: true }, // ex. user, admin, all
		kind: { type: String, required: true }, // newOrder, updateOrder, newProduct
		message: { type: String, required: true },
		payload: { type: String, required: true },
	},
	{ timestamps: true }
)

const Notif = mongoose.Model('notifications', notifSchema)

export default Notif

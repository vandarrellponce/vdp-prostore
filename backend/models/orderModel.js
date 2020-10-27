import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
				sizePrice: { type: Number, default: 0 },
				addOnPrice: { type: Number, default: 0 },
			},
		],
		shippingAddress: {
			street: { type: String, required: true },
			sitio: { type: String, required: true },
			barangay: { type: String, required: true },
			city: { type: String, required: true },
			mobile: { type: String, required: true },
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		change: { type: Number, required: true },
		cashOnHand: { type: Number, required: true },
		paymentMethod: { type: String, required: true },
		itemsPrice: { type: Number, required: true, default: 0 },
		taxPrice: { type: Number, required: true, default: 0 },
		shippingPrice: { type: Number, required: true, default: 0 },
		totalPrice: { type: Number, required: true, default: 0 },
		isPaid: { type: Boolean, required: true, default: false },
		paidAt: { type: Date },
		isDelivered: { type: Boolean, required: true, default: false },
		deliveredAt: { type: Date },
	},
	{
		timestamps: true,
	}
)

const Order = mongoose.model('Order', orderSchema)

export default Order

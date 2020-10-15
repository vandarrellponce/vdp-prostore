import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc	Create new order
// @route	Post /api/orders
// @access	Private
export const createOrder = expressAsyncHandler(async (req, res) => {
	try {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		} = req.body

		if (orderItems && orderItems.length === 0) {
			res.status(400)
			throw new Error('No order items')
		}

		const order = new Order({
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			user: req.user._id,
		})
		const savedOrder = await (await order.save())
			.populate('user', 'name email')
			.execPopulate()

		res.status(201).send(savedOrder)
	} catch (error) {
		res.status(401)
		throw new Error(error.message)
	}
})

// @desc	Get Order by ID
// @route	Get /api/orders/:orderId
// @access	Private
export const getOrderById = expressAsyncHandler(async (req, res) => {
	try {
		const orderId = req.params.orderId
		const order = await Order.findById(orderId).populate(
			'user',
			'name email'
		)
		if (!order) {
			res.status(404)
			throw new Error('No order information found')
		}
		res.send(order)
	} catch (error) {
		res.status(401)
		throw new Error(error.message)
	}
})

// @desc	Update order to paid
// @route	PUT /api/orders/:orderId/pay
// @access	Private
export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
	try {
		const orderId = req.params.orderId
		const order = await Order.findById(orderId)
		if (!order) {
			res.status(404)
			throw new Error('No order information found')
		}
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.email_address,
		}
		const updatedOrder = await order.save()
		res.send(updatedOrder)
	} catch (error) {
		res.status(401)
		throw new Error(error.message)
	}
})

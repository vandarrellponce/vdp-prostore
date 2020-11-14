import expressAsyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Notif from '../models/notifiModel.js'
import Order from '../models/orderModel.js'

// @desc	Create new order
// @route	Post /api/orders
// @access	Private
export const createOrder = expressAsyncHandler(async (req, res) => {
  try {
    const {
      cashOnHand,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
    }

    const order = new Order({
      change: cashOnHand - totalPrice,
      cashOnHand,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id
    })
    const savedOrder = await (await order.save())
      .populate('user', 'name email')
      .execPopulate()

    // create newOrder notif
    const notif = new Notif({
      target: 'admin',
      message: 'New order has been posted',
      payload: savedOrder._id
    })
    await notif.save()

    const io = req.app.get('socketio')
    io.emit('newOrder')
    io.emit('newNotification')

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
    if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
      res.status(400)
      throw new Error('Invalid ID.')
    }
    const orderId = req.params.orderId
    const order = await Order.findById(orderId).populate('user', 'name email')
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
      email_address: req.body.email_address
    }
    const updatedOrder = await order.save()
    res.send(updatedOrder)
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})

// @desc	Update order to delivered
// @route	PUT /api/orders/:orderId/deliver
// @access	Private
export const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findById(orderId)
    if (!order) {
      res.status(404)
      throw new Error('No order information found')
    }
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await (await order.save())
      .populate('user', 'name email')
      .execPopulate()
    res.send(updatedOrder)
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})

// @desc	Get orders of current user
// @route	POST /api/orders/myorders
// @access	Private
export const getUserOrders = expressAsyncHandler(async (req, res) => {
  const pageSize = req.body.pageSize || 8
  const page = req.body.page || 1
  try {
    const orders = await Order.find({
      user: req.user._id
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 })
    const count = await Order.countDocuments({})
    res.send({ orders, page, totalPages: Math.ceil(count / pageSize) })
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})

// @desc	Get all orders
// @route	POST /api/admin/orders/
// @access	Private
export const getOrders = expressAsyncHandler(async (req, res) => {
  const pageSize = req.body.pageSize || 8
  const page = req.body.page || 1
  try {
    const orders = await Order.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 })
      .populate('user', '_id name')
    const count = await Order.countDocuments({})
    res.send({ orders, page, totalPages: Math.ceil(count / pageSize) })
  } catch (error) {
    res.status(401)
    throw new Error(error.message)
  }
})

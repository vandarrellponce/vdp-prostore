import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

await connectDB()

const importData = async () => {
	try {
		await Order.deleteMany({})
		await User.deleteMany({})
		await Product.deleteMany({})

		const createdUsers = await User.insertMany(users)
		const adminUser = createdUsers[0]._id

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser }
		})
		await Product.insertMany(sampleProducts)
		console.log('Data Imported!')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await Order.deleteMany({})
		await User.deleteMany({})
		await Product.deleteMany({})

		console.log('Data Destroyed!')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}
// [0,   1,              2]
//  node backend/seeder -d
if (process.argv[2] === '-destroy') destroyData()
else importData()

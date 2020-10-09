import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		console.log('Database Connected, ' + connection.connection.host)
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

export default connectDB

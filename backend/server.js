import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoute from './routes/productRoute.js'
import connectDB from './config/db.js'

// APP CONFIG
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// DATBASE CONNECTION
await connectDB()

// ROUTES
app.use('/api/products', productRoute)
app.get('/', (req, res) => {
	res.send('API is running')
})

// PORT CONFIG
const port = process.env.PORT || 5005
app.listen(port, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}`
	)
})

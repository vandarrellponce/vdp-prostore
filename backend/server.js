import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import connectDB from './config/db.js'
import errorHandler from './middlewares/errorHandler.js'
import adminRoutes from './routes/adminRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

// APP CONFIG
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// DATBASE CONNECTION
await connectDB()

// ROUTES
app.get('/api', (req, res) => {
	res.send('API is running')
})
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
)
app.use('/api/admin', adminRoutes)
app.use('/api/uploads', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.all('*', (req, res) =>
	res.status(404).send({ message: `Not found - ${req.originalUrl}` })
)

// ERROR HANDLER
app.use(errorHandler)

// PORT CONFIG
const port = process.env.PORT || 5005
app.listen(port, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
})

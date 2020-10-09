const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const productRoute = require('./routes/productRoute')

// APP CONFIG
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// ROUTES
app.use(productRoute)
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

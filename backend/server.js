const express = require('express')
const cors = require('cors')
const productRoute = require('./routes/productRoute')
const app = express()

// APP CONFIG
app.use(express.json())
app.use(cors())

// ROUTES
app.use(productRoute)
app.get('/', (req, res) => {
	res.send('API is running')
})

// PORT CONFIG
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log('Server running on port ' + port)
})

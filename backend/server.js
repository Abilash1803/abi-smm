const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { connectDB, serverConfig } = require('./config')

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/social', require('./routes/socialMediaRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/services', require('./routes/serviceRoutes'))
app.use('/api/payments', require('./routes/paymentRoutes'))
app.use('/api/debug', require('./routes/debugRoutes'))

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Server Error' 
  })
})

// Start server
const PORT = serverConfig.port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

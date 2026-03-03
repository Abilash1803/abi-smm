const mongoose = require('mongoose')

// Database Configuration
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI
    const conn = await mongoose.connect(mongoUri)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

// JWT Configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  expiresIn: '30d'
}

// Server Configuration
const serverConfig = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development'
}

module.exports = {
  connectDB,
  jwtConfig,
  serverConfig
}

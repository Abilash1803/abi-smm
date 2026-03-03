const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  email: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['tiktok', 'instagram', 'facebook', 'youtube']
  },
  service: {
    type: String,
    required: true,
    enum: ['followers', 'likes', 'views', 'comments', 'subscribers']
  },
  username: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'delivering', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'crypto', 'bank_transfer'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  startedAt: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Generate unique order ID
orderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    this.orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  }
  next()
})

module.exports = mongoose.model('Order', orderSchema)

const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true
  },
  description: String,
  basePrice: {
    type: Number,
    required: true
  },
  minQuantity: {
    type: Number,
    default: 100
  },
  maxQuantity: {
    type: Number,
    default: 100000
  },
  deliveryTime: {
    type: String,
    default: 'Instant - 24 hours'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Service', serviceSchema)

const express = require('express')
const router = express.Router()
const {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController')

// Public routes
router.post('/', createOrder)
router.get('/:orderId', getOrder)
router.get('/user/:email', getUserOrders)

// Admin routes
router.get('/', getAllOrders)
router.put('/:orderId/status', updateOrderStatus)

module.exports = router

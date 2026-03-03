const Order = require('../models/Order')
const User = require('../models/User')

// Create new order
const createOrder = async (req, res) => {
  try {
    const { email, platform, service, username, quantity, price, paymentMethod, targetType, postId } = req.body

    // Validate required fields
    if (!email || !platform || !service || !username || !quantity || !price || !paymentMethod) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      })
    }

    // Find user by email (if logged in)
    let user = await User.findOne({ email })
    
    // Create order data
    const orderData = {
      email,
      platform,
      service,
      username,
      quantity,
      price,
      paymentMethod,
      status: 'pending',
      paymentStatus: 'pending'
    }

    // If user exists, add user reference
    if (user) {
      orderData.user = user._id
    }

    // Create order
    const order = await Order.create(orderData)

    // Add order to user's orders if user exists
    if (user) {
      user.orders.push(order._id)
      await user.save()
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: order.orderId,
        order: order
      }
    })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    })
  }
}

// Get order by ID
const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    res.json({
      success: true,
      data: order
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get all orders for a user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email }).sort({ createdAt: -1 })

    res.json({
      success: true,
      count: orders.length,
      data: orders
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status, progress } = req.body

    const order = await Order.findOne({ orderId: req.params.orderId })

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    if (status) order.status = status
    if (progress !== undefined) order.progress = progress

    if (status === 'processing' && !order.startedAt) {
      order.startedAt = Date.now()
    }

    if (status === 'completed' && !order.completedAt) {
      order.completedAt = Date.now()
      order.progress = 100
    }

    await order.save()

    res.json({
      success: true,
      data: order
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })

    res.json({
      success: true,
      count: orders.length,
      data: orders
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders
}

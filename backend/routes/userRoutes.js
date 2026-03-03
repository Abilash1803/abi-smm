const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Get user by email
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('orders')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// Create user
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body

    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }

    user = await User.create({ email, name })

    res.status(201).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router

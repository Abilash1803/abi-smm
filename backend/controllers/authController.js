const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// Register new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        token
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed'
    })
  }
}

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password')
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      })
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password)
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        token
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed'
    })
  }
}

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('orders')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        orders: user.orders,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body

    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Update fields
    if (name) user.name = name
    if (email) user.email = email

    await user.save()

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      })
    }

    const user = await User.findById(req.user.id).select('+password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword)
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
}

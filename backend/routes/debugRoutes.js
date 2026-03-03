const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Delete user by email (for debugging only - remove in production)
router.delete('/delete-user/:email', async (req, res) => {
  try {
    const result = await User.deleteOne({ email: req.params.email })
    res.json({
      success: true,
      message: 'User deleted',
      result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router

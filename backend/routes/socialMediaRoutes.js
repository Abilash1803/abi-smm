const express = require('express')
const router = express.Router()
const {
  verifyAccount,
  verifyAccountByPlatform,
  fetchPosts
} = require('../controllers/socialMediaController')

// Verify account (POST)
router.post('/verify', verifyAccount)

// Verify account by platform (GET)
router.get('/verify/:platform/:username', verifyAccountByPlatform)

// Fetch posts from account
router.get('/posts/:platform/:username', fetchPosts)

module.exports = router

const socialMediaService = require('../services/socialMediaService')

// Verify social media account
const verifyAccount = async (req, res) => {
  try {
    const { platform, username } = req.body

    if (!platform || !username) {
      return res.status(400).json({
        success: false,
        message: 'Platform and username are required'
      })
    }

    // Verify the account
    const result = await socialMediaService.verifyAccount(platform, username)

    if (result.exists) {
      return res.json({
        success: true,
        message: 'Account verified successfully',
        data: result
      })
    } else {
      return res.status(404).json({
        success: false,
        message: result.error || 'Account not found',
        data: result
      })
    }
  } catch (error) {
    console.error('Account verification error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to verify account',
      error: error.message
    })
  }
}

// Verify account by platform (GET method for quick checks)
const verifyAccountByPlatform = async (req, res) => {
  try {
    const { platform, username } = req.params

    if (!platform || !username) {
      return res.status(400).json({
        success: false,
        message: 'Platform and username are required'
      })
    }

    // Verify the account
    const result = await socialMediaService.verifyAccount(platform, username)

    if (result.exists) {
      return res.json({
        success: true,
        message: 'Account verified successfully',
        data: result
      })
    } else {
      return res.status(404).json({
        success: false,
        message: result.error || 'Account not found',
        data: result
      })
    }
  } catch (error) {
    console.error('Account verification error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to verify account',
      error: error.message
    })
  }
}

module.exports = {
  verifyAccount,
  verifyAccountByPlatform
}


// Fetch posts from social media account
const fetchPosts = async (req, res) => {
  try {
    const { platform, username } = req.params
    const limit = parseInt(req.query.limit) || 12

    if (!platform || !username) {
      return res.status(400).json({
        success: false,
        message: 'Platform and username are required'
      })
    }

    // Fetch posts
    const result = await socialMediaService.fetchPosts(platform, username, limit)

    if (result.success) {
      return res.json({
        success: true,
        message: 'Posts fetched successfully',
        data: {
          posts: result.posts,
          count: result.posts.length
        }
      })
    } else {
      return res.status(404).json({
        success: false,
        message: result.error || 'Failed to fetch posts'
      })
    }
  } catch (error) {
    console.error('Posts fetch error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
      error: error.message
    })
  }
}

module.exports = {
  verifyAccount,
  verifyAccountByPlatform,
  fetchPosts
}

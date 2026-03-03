import { API_BASE_URL } from '../config/api'

// Social Media Verification API
export const socialMediaAPI = {
  // Verify account
  verifyAccount: async (platform, username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/social/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ platform, username })
      })

      const data = await response.json()

      return {
        success: response.ok,
        ...data
      }
    } catch (error) {
      console.error('Account verification error:', error)
      return {
        success: false,
        message: 'Failed to verify account',
        error: error.message
      }
    }
  },

  // Quick verify (GET method)
  quickVerify: async (platform, username) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/verify/${platform}/${encodeURIComponent(username)}`
      )

      const data = await response.json()

      return {
        success: response.ok,
        ...data
      }
    } catch (error) {
      console.error('Quick verification error:', error)
      return {
        success: false,
        message: 'Failed to verify account',
        error: error.message
      }
    }
  },

  // Fetch posts from account
  fetchPosts: async (platform, username, limit = 12) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/posts/${platform}/${encodeURIComponent(username)}?limit=${limit}`
      )

      const data = await response.json()

      return {
        success: response.ok,
        ...data
      }
    } catch (error) {
      console.error('Posts fetch error:', error)
      return {
        success: false,
        message: 'Failed to fetch posts',
        error: error.message
      }
    }
  }
}

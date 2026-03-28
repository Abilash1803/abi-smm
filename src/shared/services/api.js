// API Service for Backend Integration
import { getCurrentConfig } from '../constants/api'

/**
 * Centralized API Service
 * Handles all backend communication with proper error handling
 * 
 * TODO: Backend Integration
 * - Add request/response interceptors
 * - Implement retry logic for failed requests
 * - Add request caching
 * - Implement proper authentication headers
 */
const config = getCurrentConfig()

class ApiService {
  constructor() {
    this.baseURL = config.BASE_URL
    this.timeout = config.TIMEOUT
    this.defaultHeaders = config.HEADERS
  }

  // Generic API call method with better error handling
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const requestConfig = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      timeout: this.timeout,
      ...options
    }

    try {
      const response = await fetch(url, requestConfig)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      if (config.DEBUG) {
        console.error('API request failed:', {
          url,
          error: error.message,
          options: requestConfig
        })
      }
      throw error
    }
  }

  // Instagram profile fetching using real Instagram data
  async searchInstagram(username) {
    try {
      // Clean username (remove @ if present)
      const cleanUsername = username.replace('@', '').trim()
      
      if (!cleanUsername) {
        throw new Error('Please enter a valid username')
      }

      // REAL INSTAGRAM INTEGRATION: Fetch profile data from Instagram
      const instagramUrl = `https://www.instagram.com/${cleanUsername}/`
      
      // For development/testing, we'll use a proxy service or backend endpoint
      // In production, this should be handled by your backend to avoid CORS issues
      const proxyUrl = `${this.baseURL}/api/instagram/profile/${cleanUsername}`
      
      try {
        // Attempt to fetch real Instagram data through backend proxy
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            ...this.defaultHeaders,
            'Accept': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        })

        if (response.ok) {
          const profileData = await response.json()
          return {
            username: cleanUsername,
            followers: this.formatNumber(profileData.followers || 0),
            following: this.formatNumber(profileData.following || 0),
            posts: this.formatNumber(profileData.posts || 0),
            verified: profileData.verified || false,
            profilePicture: profileData.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`,
            bio: profileData.bio || 'Instagram user',
            isPrivate: profileData.isPrivate || false,
            instagramUrl: instagramUrl,
            realProfile: true // Flag to indicate this is real data
          }
        }
      } catch (backendError) {
        console.warn('Backend Instagram API not available, using fallback method:', backendError.message)
      }

      // FALLBACK: If backend is not available, try alternative method
      // This is a simplified approach - in production, always use backend
      try {
        // Attempt to validate username exists by checking Instagram URL
        const testResponse = await fetch(`https://www.instagram.com/${cleanUsername}/`, {
          method: 'HEAD',
          mode: 'no-cors' // This will limit what we can check, but avoids CORS
        })
        
        // Since we can't read the response due to CORS, we'll provide mock data
        // but indicate it's based on a real username format
        return {
          username: cleanUsername,
          followers: 'N/A', // Real data requires backend integration
          following: 'N/A',
          posts: 'N/A',
          verified: false,
          profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`,
          bio: `Instagram profile: @${cleanUsername}`,
          isPrivate: false,
          instagramUrl: instagramUrl,
          realProfile: false, // Indicates this is placeholder data
          message: 'Profile data requires backend integration for full details'
        }
      } catch (urlError) {
        // If even the URL test fails, the username might be invalid
        throw new Error(`Instagram profile @${cleanUsername} not found or not accessible`)
      }

    } catch (error) {
      // Handle various error cases
      if (error.message.includes('not found') || error.message.includes('not accessible')) {
        throw error
      } else {
        throw new Error(`Unable to fetch Instagram profile: ${error.message}`)
      }
    }
  }

  // Helper method to format numbers (K, M format)
  formatNumber(num) {
    if (typeof num !== 'number') return num
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    } else {
      return num.toString()
    }
  }

  // YouTube profile fetching using real YouTube data
  async searchYoutube(channelName, type = 'channel') {
    try {
      // Clean channel name (remove @ if present)
      const cleanChannelName = channelName.replace('@', '').trim()
      
      if (!cleanChannelName) {
        throw new Error('Please enter a valid channel name')
      }

      // REAL YOUTUBE INTEGRATION: Fetch profile data from YouTube
      const youtubeUrl = `https://www.youtube.com/${type === 'channel' ? 'c' : '@'}/${cleanChannelName}`
      
      // For development/testing, we'll use a proxy service or backend endpoint
      const proxyUrl = `${this.baseURL}/api/youtube/profile/${cleanChannelName}`
      
      try {
        // Attempt to fetch real YouTube data through backend proxy
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            ...this.defaultHeaders,
            'Accept': 'application/json'
          },
          timeout: 10000
        })

        if (response.ok) {
          const profileData = await response.json()
          return {
            channelName: cleanChannelName,
            subscribers: this.formatNumber(profileData.subscribers || 0),
            videos: this.formatNumber(profileData.videos || 0),
            views: this.formatNumber(profileData.views || 0),
            verified: profileData.verified || false,
            channelPicture: profileData.channelPicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanChannelName}`,
            description: profileData.description || 'YouTube channel',
            type,
            youtubeUrl: youtubeUrl,
            realProfile: true
          }
        }
      } catch (backendError) {
        console.warn('Backend YouTube API not available, using fallback method:', backendError.message)
      }

      // FALLBACK: Provide placeholder data with real URL
      return {
        channelName: cleanChannelName,
        subscribers: 'N/A',
        videos: 'N/A',
        views: 'N/A',
        verified: false,
        channelPicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanChannelName}`,
        description: `YouTube channel: ${cleanChannelName}`,
        type,
        youtubeUrl: youtubeUrl,
        realProfile: false,
        message: 'Channel data requires backend integration for full details'
      }

    } catch (error) {
      throw new Error(`YouTube channel "${channelName}" not found or not accessible`)
    }
  }

  // Facebook profile fetching using real Facebook data
  async searchFacebook(pageName) {
    try {
      // Clean page name (remove @ if present)
      const cleanPageName = pageName.replace('@', '').trim()
      
      if (!cleanPageName) {
        throw new Error('Please enter a valid page name')
      }

      // REAL FACEBOOK INTEGRATION: Fetch profile data from Facebook
      const facebookUrl = `https://www.facebook.com/${cleanPageName}`
      
      // For development/testing, we'll use a proxy service or backend endpoint
      const proxyUrl = `${this.baseURL}/api/facebook/profile/${cleanPageName}`
      
      try {
        // Attempt to fetch real Facebook data through backend proxy
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            ...this.defaultHeaders,
            'Accept': 'application/json'
          },
          timeout: 10000
        })

        if (response.ok) {
          const profileData = await response.json()
          return {
            pageName: cleanPageName,
            likes: this.formatNumber(profileData.likes || 0),
            followers: this.formatNumber(profileData.followers || 0),
            verified: profileData.verified || false,
            profilePicture: profileData.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanPageName}`,
            description: profileData.description || 'Facebook page',
            category: profileData.category || 'Community',
            facebookUrl: facebookUrl,
            realProfile: true
          }
        }
      } catch (backendError) {
        console.warn('Backend Facebook API not available, using fallback method:', backendError.message)
      }

      // FALLBACK: Provide placeholder data with real URL
      return {
        pageName: cleanPageName,
        likes: 'N/A',
        followers: 'N/A',
        verified: false,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanPageName}`,
        description: `Facebook page: ${cleanPageName}`,
        category: 'Community',
        facebookUrl: facebookUrl,
        realProfile: false,
        message: 'Page data requires backend integration for full details'
      }

    } catch (error) {
      throw new Error(`Facebook page "${pageName}" not found or not accessible`)
    }
  }

  // TikTok profile fetching using real TikTok data
  async searchTiktok(username) {
    try {
      // Clean username (remove @ if present)
      const cleanUsername = username.replace('@', '').trim()
      
      if (!cleanUsername) {
        throw new Error('Please enter a valid username')
      }

      // REAL TIKTOK INTEGRATION: Fetch profile data from TikTok
      const tiktokUrl = `https://www.tiktok.com/@${cleanUsername}`
      
      // For development/testing, we'll use a proxy service or backend endpoint
      const proxyUrl = `${this.baseURL}/api/tiktok/profile/${cleanUsername}`
      
      try {
        // Attempt to fetch real TikTok data through backend proxy
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            ...this.defaultHeaders,
            'Accept': 'application/json'
          },
          timeout: 10000
        })

        if (response.ok) {
          const profileData = await response.json()
          return {
            username: cleanUsername,
            followers: this.formatNumber(profileData.followers || 0),
            following: this.formatNumber(profileData.following || 0),
            likes: this.formatNumber(profileData.likes || 0),
            videos: this.formatNumber(profileData.videos || 0),
            verified: profileData.verified || false,
            profilePicture: profileData.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`,
            bio: profileData.bio || 'TikTok user',
            tiktokUrl: tiktokUrl,
            realProfile: true
          }
        }
      } catch (backendError) {
        console.warn('Backend TikTok API not available, using fallback method:', backendError.message)
      }

      // FALLBACK: Provide placeholder data with real URL
      return {
        username: cleanUsername,
        followers: 'N/A',
        following: 'N/A',
        likes: 'N/A',
        videos: 'N/A',
        verified: false,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`,
        bio: `TikTok profile: @${cleanUsername}`,
        tiktokUrl: tiktokUrl,
        realProfile: false,
        message: 'Profile data requires backend integration for full details'
      }

    } catch (error) {
      throw new Error(`TikTok profile "@${username}" not found or not accessible`)
    }
  }

  // Order/Purchase methods
  async createOrder(orderData) {
    return this.makeRequest(config.ENDPOINTS.CREATE_ORDER, {
      method: 'POST',
      body: JSON.stringify(orderData)
    })
  }

  async getOrderStatus(orderId) {
    return this.makeRequest(`${config.ENDPOINTS.GET_ORDER}/${orderId}`)
  }

  // User authentication methods
  async login(credentials) {
    return this.makeRequest(config.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  async register(userData) {
    return this.makeRequest(config.ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  // User profile methods
  async getUserProfile() {
    return this.makeRequest(config.ENDPOINTS.PROFILE)
  }

  async getUserOrders() {
    return this.makeRequest(config.ENDPOINTS.ORDERS_HISTORY)
  }
}

export default new ApiService()
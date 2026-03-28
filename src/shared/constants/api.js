// API Configuration
// Easy to modify for different environments

export const API_CONFIG = {
  // Backend API Base URL - Change this to your backend URL
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  
  // API Endpoints - Easy to modify
  ENDPOINTS: {
    // Search endpoints
    INSTAGRAM_SEARCH: '/instagram/search',
    YOUTUBE_SEARCH: '/youtube/search', 
    FACEBOOK_SEARCH: '/facebook/search',
    TIKTOK_SEARCH: '/tiktok/search',
    
    // Order endpoints
    CREATE_ORDER: '/orders',
    GET_ORDER: '/orders',
    
    // Auth endpoints
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    
    // User endpoints
    PROFILE: '/user/profile',
    ORDERS_HISTORY: '/user/orders'
  },
  
  // Request timeout (in milliseconds)
  TIMEOUT: 10000,
  
  // Default headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

// Environment-specific configurations
export const ENV_CONFIG = {
  development: {
    BASE_URL: 'http://localhost:3001/api',
    DEBUG: true
  },
  production: {
    BASE_URL: 'https://your-production-api.com/api',
    DEBUG: false
  },
  staging: {
    BASE_URL: 'https://your-staging-api.com/api', 
    DEBUG: true
  }
}

// Get current environment config
export const getCurrentConfig = () => {
  const env = import.meta.env.MODE || 'development'
  return {
    ...API_CONFIG,
    ...ENV_CONFIG[env]
  }
}
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'

/**
 * Social Profile Overview Page
 * Displays user's social media profile and available services
 * 
 * BACKEND INTEGRATION POINTS:
 * - Profile data: Fetch real profile data from social media APIs
 * - Services: Load available services and pricing from database
 * - User tracking: Track service selections and user behavior
 * - Profile validation: Verify profile exists and is accessible
 */
const SocialProfileOverviewPage = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform } = location.state || {}

  // BACKEND TODO: Replace with API call to fetch real profile data
  // GET /api/social-profiles/{platform}/{username} - Returns profile data from social media API
  const profileData = location.state?.profileData || {
    username: username || 'example_user',
    followers: '12.5K', // BACKEND: Get from social media API
    following: '1,234', // BACKEND: Get from social media API
    postsCount: '567',  // BACKEND: Get from social media API
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`,
    bio: 'Content creator | Digital marketer | Lifestyle enthusiast', // BACKEND: Get from social media API
    verified: true,     // BACKEND: Get from social media API
    isPrivate: false    // BACKEND: Get from social media API
  }

  // BACKEND TODO: Load services from database with real pricing
  // GET /api/services/{platform} - Returns available services for platform
  const platformServices = {
    instagram: [
      { id: 'followers', name: 'Followers', description: 'Get real Instagram followers to grow your audience', price: 'From $2.99', popular: true },
      { id: 'likes', name: 'Likes', description: 'Boost your post engagement with authentic likes', price: 'From $1.99', popular: false },
      { id: 'comments', name: 'Comments', description: 'Get meaningful comments from real users', price: 'From $4.99', popular: false },
      { id: 'views', name: 'Views', description: 'Increase your story and reel visibility', price: 'From $0.99', popular: false },
      { id: 'saves', name: 'Saves', description: 'Get users to save your valuable content', price: 'From $3.99', popular: false },
      { id: 'shares', name: 'Shares', description: 'Amplify your reach with organic shares', price: 'From $2.49', popular: false }
    ],
    youtube: [
      { id: 'subscribers', name: 'Subscribers', description: 'Build a loyal subscriber base for your channel', price: 'From $4.99', popular: true },
      { id: 'views', name: 'Views', description: 'Boost your video visibility and ranking', price: 'From $1.99', popular: false },
      { id: 'likes', name: 'Likes', description: 'Increase engagement with video likes', price: 'From $2.99', popular: false },
      { id: 'comments', name: 'Comments', description: 'Get authentic comments on your videos', price: 'From $5.99', popular: false },
      { id: 'shares', name: 'Shares', description: 'Expand your reach through video shares', price: 'From $3.49', popular: false },
      { id: 'watchtime', name: 'Watch Time', description: 'Boost your channel watch hours for monetization', price: 'From $7.99', popular: false }
    ],
    facebook: [
      { id: 'page_likes', name: 'Page Likes', description: 'Grow your business page following', price: 'From $3.99', popular: true },
      { id: 'post_likes', name: 'Post Likes', description: 'Boost engagement on your posts', price: 'From $1.99', popular: false },
      { id: 'comments', name: 'Comments', description: 'Get meaningful discussions on your posts', price: 'From $4.99', popular: false },
      { id: 'shares', name: 'Shares', description: 'Increase your content reach through shares', price: 'From $2.99', popular: false },
      { id: 'video_views', name: 'Video Views', description: 'Boost your video content visibility', price: 'From $1.49', popular: false },
      { id: 'followers', name: 'Followers', description: 'Grow your personal profile following', price: 'From $3.49', popular: false }
    ],
    tiktok: [
      { id: 'followers', name: 'Followers', description: 'Build your TikTok community and influence', price: 'From $3.99', popular: true },
      { id: 'likes', name: 'Likes', description: 'Boost your video engagement and visibility', price: 'From $1.99', popular: false },
      { id: 'views', name: 'Views', description: 'Increase your video reach and discovery', price: 'From $0.99', popular: false },
      { id: 'comments', name: 'Comments', description: 'Get engaging comments on your videos', price: 'From $4.99', popular: false },
      { id: 'shares', name: 'Shares', description: 'Amplify your content through viral shares', price: 'From $2.99', popular: false },
      { id: 'favorites', name: 'Favorites', description: 'Get users to favorite your content', price: 'From $3.49', popular: false }
    ]
  }

  // BACKEND TODO: Load platform configuration from database
  // GET /api/platforms/config - Returns platform colors, names, and settings
  const platformConfig = {
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok', bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' }
  }

  const services = platformServices[platform] || platformServices.instagram
  const config = platformConfig[platform] || platformConfig.instagram

  // SERVICE SELECTION HANDLER - Navigate to next step
  const handleServiceSelect = (service) => {
    // BACKEND TODO: Track service selection
    // POST /api/analytics/track-service-selection {
    //   platform, username, serviceId: service.id, timestamp: Date.now()
    // }
    
    // Services that don't require post selection (profile-level services)
    const profileLevelServices = [
      'followers', 'subscribers', 'page_likes', 'watchtime'
    ]
    
    // Check if this service is profile-level (doesn't need post selection)
    if (profileLevelServices.includes(service.id)) {
      // Navigate directly to quantity selection for profile-level services
      navigate('/quantity-pricing', {
        state: {
          username,
          platform,
          selectedService: service,
          profileData,
          selectedPosts: [], // No posts needed for profile-level services
          isProfileService: true // Flag to indicate this is a profile-level service
        }
      })
    } else {
      // Navigate to post selection for post-level services (likes, comments, views, etc.)
      navigate('/posts-selection', {
        state: {
          username,
          platform,
          selectedService: service,
          profileData
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Premium Profile Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-white/50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100/30 to-orange-100/30 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
                    {profileData.avatar ? (
                      <img 
                        src={profileData.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.username}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                        {profileData.username?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  {profileData.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">@{profileData.username}</h1>
                    {profileData.isPrivate && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">Private</span>
                    )}
                  </div>
                  
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${config.color} text-white shadow-lg`}>
                    {config.name} Profile
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm sm:text-base mb-4 px-4">{profileData.bio}</p>
                
                {/* Mobile Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-gray-900">{profileData.postsCount}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-gray-900">{profileData.followers}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-gray-900">{profileData.following}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Following</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  {profileData.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.username}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">
                      {profileData.username?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                {profileData.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h1 className="text-3xl font-bold text-gray-900">@{profileData.username}</h1>
                  {profileData.isPrivate && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">Private</span>
                  )}
                  <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${config.color} text-white shadow-lg`}>
                    {config.name}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg">{profileData.bio}</p>
                
                <div className="flex gap-12">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{profileData.postsCount}</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{profileData.followers}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{profileData.following}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Services Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full -translate-y-20 -translate-x-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-100/20 to-indigo-100/20 rounded-full translate-y-16 translate-x-16"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                Choose Your <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{config.name}</span> Service
              </h2>
              <p className="text-gray-600 text-sm sm:text-base px-4">Select the service you want to boost for this profile</p>
            </div>
            
            {/* Premium Creative Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="relative cursor-pointer group transition-all duration-500 transform hover:scale-105 active:scale-95"
                >
                  {service.popular && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                        <span className="relative z-10">POPULAR</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-full animate-ping opacity-75"></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all duration-500 group-hover:shadow-2xl">
                    {/* Premium Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 left-0 w-full h-full">
                        <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${config.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                        <div className={`absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr ${config.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r ${config.color} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      </div>
                    </div>
                    
                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${config.color} p-0.5`}>
                        <div className="w-full h-full rounded-3xl bg-white"></div>
                      </div>
                    </div>
                    
                    <div className="relative z-10 p-6 sm:p-8">
                      {/* Service Header */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.color} shadow-lg`}></div>
                          <div className="text-xs text-gray-400 font-medium tracking-wider uppercase">
                            {platform}
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-xl sm:text-2xl text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                          {service.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                          {service.description}
                        </p>
                      </div>
                      
                      {/* Premium Pricing Display */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                            {service.price.split(' ')[1]}
                          </span>
                          <span className="text-sm text-gray-500">
                            {service.price.split(' ')[0]}
                          </span>
                        </div>
                        
                        {/* Premium Features */}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            ✓ Instant Start
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            ✓ Real Users
                          </span>
                        </div>
                      </div>
                      
                      {/* Premium Action Button */}
                      <button className={`w-full relative overflow-hidden bg-gradient-to-r ${config.color} text-white py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/25`}>
                        <span className="relative z-10">Select {service.name}</span>
                        
                        {/* Button Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </button>
                      
                      {/* Hover Glow Effect */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                    </div>
                    
                    {/* Premium Card Number */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Premium Features Banner */}
            <div className="mt-8 sm:mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">✨ Premium Features Included</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Real Users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Money Back</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialProfileOverviewPage
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'

const ServicePricingPage = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, selectedService, profileData, selectedPosts, isProfileService } = location.state || {}
  
  const [quantity, setQuantity] = useState(1000)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponCode, setCouponCode] = useState('')
  const [progressValue, setProgressValue] = useState(0)

  // Service pricing configuration
  const servicePricing = {
    instagram: {
      followers: { basePrice: 0.005, min: 100, max: 50000, packages: [100, 500, 1000, 2500, 5000, 10000] },
      likes: { basePrice: 0.002, min: 50, max: 100000, packages: [50, 250, 500, 1000, 2500, 5000] },
      comments: { basePrice: 0.08, min: 10, max: 1000, packages: [10, 25, 50, 100, 250, 500] },
      views: { basePrice: 0.001, min: 1000, max: 1000000, packages: [1000, 5000, 10000, 25000, 50000, 100000] },
      saves: { basePrice: 0.004, min: 25, max: 10000, packages: [25, 100, 250, 500, 1000, 2500] },
      shares: { basePrice: 0.003, min: 25, max: 5000, packages: [25, 100, 250, 500, 1000, 2000] }
    },
    youtube: {
      subscribers: { basePrice: 0.01, min: 50, max: 10000, packages: [50, 100, 250, 500, 1000, 2500] },
      views: { basePrice: 0.002, min: 1000, max: 1000000, packages: [1000, 5000, 10000, 25000, 50000, 100000] },
      likes: { basePrice: 0.003, min: 50, max: 50000, packages: [50, 250, 500, 1000, 2500, 5000] },
      comments: { basePrice: 0.1, min: 10, max: 500, packages: [10, 25, 50, 100, 200, 300] },
      shares: { basePrice: 0.005, min: 25, max: 5000, packages: [25, 100, 250, 500, 1000, 2000] },
      watchtime: { basePrice: 0.015, min: 100, max: 10000, packages: [100, 500, 1000, 2500, 5000, 7500] }
    },
    facebook: {
      page_likes: { basePrice: 0.008, min: 100, max: 25000, packages: [100, 500, 1000, 2500, 5000, 10000] },
      post_likes: { basePrice: 0.002, min: 50, max: 50000, packages: [50, 250, 500, 1000, 2500, 5000] },
      comments: { basePrice: 0.09, min: 10, max: 500, packages: [10, 25, 50, 100, 200, 300] },
      shares: { basePrice: 0.004, min: 25, max: 5000, packages: [25, 100, 250, 500, 1000, 2000] },
      video_views: { basePrice: 0.001, min: 1000, max: 500000, packages: [1000, 5000, 10000, 25000, 50000, 100000] },
      followers: { basePrice: 0.006, min: 100, max: 15000, packages: [100, 500, 1000, 2500, 5000, 7500] }
    },
    tiktok: {
      followers: { basePrice: 0.007, min: 100, max: 25000, packages: [100, 500, 1000, 2500, 5000, 10000] },
      likes: { basePrice: 0.002, min: 100, max: 100000, packages: [100, 500, 1000, 2500, 5000, 10000] },
      views: { basePrice: 0.0008, min: 1000, max: 1000000, packages: [1000, 5000, 10000, 25000, 50000, 100000] },
      comments: { basePrice: 0.08, min: 10, max: 1000, packages: [10, 25, 50, 100, 250, 500] },
      shares: { basePrice: 0.003, min: 25, max: 10000, packages: [25, 100, 250, 500, 1000, 2500] },
      favorites: { basePrice: 0.004, min: 50, max: 10000, packages: [50, 250, 500, 1000, 2500, 5000] }
    }
  }

  const coupons = {
    'FIRST10': { discount: 0.10, minOrder: 0, description: '10% off first order' },
    'BULK20': { discount: 0.20, minOrder: 50, description: '20% off orders above $50' },
    'SAVE15': { discount: 0.15, minOrder: 25, description: '15% off orders above $25' }
  }

  const platformConfig = {
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok' }
  }

  const config = platformConfig[platform] || platformConfig.instagram
  const pricing = servicePricing[platform]?.[selectedService?.id] || servicePricing.instagram.followers
  const hasSelectedPosts = selectedPosts && selectedPosts.length > 0
  // Effects and handlers
  useEffect(() => {
    const progress = ((quantity - pricing.min) / (pricing.max - pricing.min)) * 100
    setProgressValue(progress)
  }, [quantity, pricing.min, pricing.max])

  const calculatePrice = () => {
    const baseTotal = quantity * pricing.basePrice
    const discount = appliedCoupon ? appliedCoupon.discount : 0
    return baseTotal * (1 - discount)
  }

  const getQuantityPerPost = () => {
    if (!hasSelectedPosts || isProfileService) {
      return quantity
    }
    return Math.floor(quantity / selectedPosts.length)
  }

  const getQuantityIncrement = () => {
    const serviceId = selectedService?.id
    const smallIncrementServices = ['comments', 'subscribers', 'shares', 'saves', 'favorites']
    const largeIncrementServices = ['views', 'video_views', 'watchtime']
    
    if (smallIncrementServices.includes(serviceId)) {
      return 25
    } else if (largeIncrementServices.includes(serviceId)) {
      return 1000
    } else {
      return 100
    }
  }

  const applyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase()]
    if (coupon && calculatePrice() >= coupon.minOrder) {
      setAppliedCoupon(coupon)
      setCouponCode('')
    } else {
      alert('Invalid coupon code or minimum order not met')
    }
  }

  const handleContinue = () => {
    navigate('/payment', {
      state: {
        username,
        platform,
        selectedService,
        profileData,
        selectedPosts,
        quantity,
        totalPrice: calculatePrice(),
        appliedCoupon
      }
    })
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">

        {/* Premium Profile Section - Responsive */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8 border border-white/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100/50 to-orange-100/50 rounded-full translate-y-12 -translate-x-12"></div>
          
          {/* Mobile Layout */}
          <div className="relative z-10 lg:hidden">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative flex-shrink-0">
                {profileData?.avatar ? (
                  <img 
                    src={profileData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData?.username}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`
                    }}
                  />
                ) : (
                  <div className="text-white font-bold text-lg sm:text-2xl">
                    {profileData?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">@{profileData?.username}</h1>
                <div className="text-right sm:hidden">
                  <div className={`text-sm font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent capitalize`}>
                    {platform}
                  </div>
                </div>
              </div>
              
              <div className="text-right hidden sm:block">
                <div className="text-xs text-gray-600 mb-1">Platform</div>
                <div className={`text-lg font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent capitalize`}>
                  {platform}
                </div>
              </div>
            </div>
            
            {/* Mobile Service Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold text-gray-900 truncate">{selectedService?.name}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 rounded-lg p-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex-shrink-0"></div>
                {hasSelectedPosts && !isProfileService ? (
                  <>
                    <span className="text-gray-600">Posts:</span>
                    <span className="font-semibold text-gray-900">{selectedPosts?.length}</span>
                  </>
                ) : (
                  <>
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold text-gray-900">Profile</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="relative z-10 hidden lg:flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
              {profileData?.avatar ? (
                <img 
                  src={profileData.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData?.username}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`
                  }}
                />
              ) : (
                <div className="text-white font-bold text-2xl">
                  {profileData?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">@{profileData?.username}</h1>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold text-gray-900">{selectedService?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                  {hasSelectedPosts && !isProfileService ? (
                    <>
                      <span className="text-gray-600">Posts:</span>
                      <span className="font-semibold text-gray-900">{selectedPosts?.length}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold text-gray-900">Profile Service</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Platform</div>
              <div className={`text-xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent capitalize`}>
                {platform}
              </div>
            </div>
          </div>
        </div>
        {/* Responsive Layout Container */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Premium Quantity Selection - Mobile First */}
          <div className="xl:col-span-2">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-purple-50 rounded-full -translate-y-20 translate-x-20 opacity-50"></div>
              
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Select Quantity</h2>
                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  Choose the perfect amount of <span className={`font-semibold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{selectedService?.name}</span> for your needs
                </p>
                
                {/* Compact Premium Quantity Display */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="relative inline-block">
                    {/* Compact quantity card */}
                    <div className="relative group">
                      {/* Subtle glow effect */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${config.color} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                      
                      {/* Main compact card */}
                      <div className="relative bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105">
                        {/* Just the number - large and bold */}
                        <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                          {quantity.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Premium Animated Slider - Mobile Responsive */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <button
                      onClick={() => {
                        const increment = getQuantityIncrement()
                        const newQuantity = Math.max(pricing.min, quantity - increment)
                        setQuantity(newQuantity)
                      }}
                      disabled={quantity <= pricing.min}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                        quantity <= pricing.min
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 hover:shadow-xl transform hover:scale-110'
                      }`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </button>
                    
                    <div className="flex-1 relative">
                      <div className="h-3 sm:h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-inner overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${config.color} rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
                          style={{ width: `${progressValue}%` }}
                        >
                          {/* Animated arrow moving along the slider */}
                          <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 animate-arrow-slide">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full shadow-lg flex items-center justify-center">
                              <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                              </svg>
                            </div>
                          </div>
                          
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                      
                      <input
                        type="range"
                        min={pricing.min}
                        max={pricing.max}
                        step={getQuantityIncrement()}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    
                    <button
                      onClick={() => {
                        const increment = getQuantityIncrement()
                        const newQuantity = Math.min(pricing.max, quantity + increment)
                        setQuantity(newQuantity)
                      }}
                      disabled={quantity >= pricing.max}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                        quantity >= pricing.max
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 hover:shadow-xl transform hover:scale-110'
                      }`}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                    <span>{pricing.min.toLocaleString()}</span>
                    <span className="hidden sm:inline">Adjust by {getQuantityIncrement().toLocaleString()}</span>
                    <span className="sm:hidden">+{getQuantityIncrement().toLocaleString()}</span>
                    <span>{pricing.max.toLocaleString()}</span>
                  </div>
                  
                  {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 6 columns */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                    {pricing.packages.map((pkg) => (
                      <button
                        key={pkg}
                        onClick={() => setQuantity(pkg)}
                        className={`px-2 sm:px-3 lg:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 shadow-lg ${
                          quantity === pkg
                            ? `bg-gradient-to-r ${config.color} text-white shadow-xl`
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {pkg >= 1000 ? `${pkg/1000}K` : pkg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Distribution Info - Mobile Optimized */}
                <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <h3 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">
                    {isProfileService ? 'Profile Service Details' : 'Distribution Breakdown'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex justify-between sm:block">
                      <span className="text-blue-700">Total {selectedService?.name}:</span>
                      <span className="font-bold text-blue-900 sm:ml-2">{quantity.toLocaleString()}</span>
                    </div>
                    {isProfileService ? (
                      <div className="flex justify-between sm:block">
                        <span className="text-blue-700">Applied to:</span>
                        <span className="font-bold text-blue-900 sm:ml-2 truncate">@{profileData?.username}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between sm:block">
                        <span className="text-blue-700">Per Post:</span>
                        <span className="font-bold text-blue-900 sm:ml-2">{getQuantityPerPost().toLocaleString()}</span>
                      </div>
                    )}
                    {hasSelectedPosts && !isProfileService ? (
                      <div className="flex justify-between sm:block">
                        <span className="text-blue-700">Selected Posts:</span>
                        <span className="font-bold text-blue-900 sm:ml-2">{selectedPosts?.length}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between sm:block">
                        <span className="text-blue-700">Service Type:</span>
                        <span className="font-bold text-blue-900 sm:ml-2">Profile Level</span>
                      </div>
                    )}
                    <div className="flex justify-between sm:block">
                      <span className="text-blue-700">Platform:</span>
                      <span className="font-bold text-blue-900 sm:ml-2 capitalize">{platform}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Section - Mobile Responsive */}
                <div className="border-t pt-4 sm:pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Apply Coupon Code</h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-colors text-sm sm:text-base whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {Object.entries(coupons).map(([code, coupon]) => (
                      <div
                        key={code}
                        onClick={() => setCouponCode(code)}
                        className="border-2 border-dashed border-green-300 bg-green-50 p-2.5 sm:p-3 rounded-lg sm:rounded-xl cursor-pointer hover:bg-green-100 transition-colors"
                      >
                        <div className="font-semibold text-green-700 text-xs sm:text-sm">{code}</div>
                        <div className="text-xs text-green-600">{coupon.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Price Summary - Mobile Responsive */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-100 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold truncate ml-2">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{quantity.toLocaleString()}</span>
                </div>
                {hasSelectedPosts && !isProfileService ? (
                  <>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Posts:</span>
                      <span className="font-semibold">{selectedPosts?.length}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Per Post:</span>
                      <span className="font-semibold">{getQuantityPerPost().toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Applied to:</span>
                    <span className="font-semibold">Profile</span>
                  </div>
                )}
                
                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${(quantity * pricing.basePrice).toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-xs sm:text-sm text-green-600 mb-2">
                      <span>Discount ({(appliedCoupon.discount * 100).toFixed(0)}%):</span>
                      <span>-${((quantity * pricing.basePrice) * appliedCoupon.discount).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">Total:</span>
                    <span className={`font-bold text-xl sm:text-2xl bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                      ${calculatePrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className={`w-full bg-gradient-to-r ${config.color} text-white py-3 sm:py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base`}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes arrow-slide {
          0% {
            transform: translateX(-50%) translateY(-50%) scale(0.8);
            opacity: 0.7;
          }
          50% {
            transform: translateX(-50%) translateY(-50%) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(-50%) scale(0.8);
            opacity: 0.7;
          }
        }
        
        @keyframes flow {
          0% {
            left: -8px;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        
        @keyframes flow-delayed {
          0% {
            left: -6px;
            opacity: 0;
          }
          25% {
            opacity: 0.6;
          }
          75% {
            opacity: 0.6;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-arrow-slide {
          animation: arrow-slide 2s ease-in-out infinite;
        }
        
        .animate-flow {
          animation: flow 3s infinite;
        }
        
        .animate-flow-delayed {
          animation: flow-delayed 3s infinite 1.5s;
        }
      `}</style>
    </div>
  )
}

export default ServicePricingPage
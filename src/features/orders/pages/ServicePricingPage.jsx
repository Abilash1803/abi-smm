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
  const [selectedTier, setSelectedTier] = useState('growth')

  // Service pricing configuration with psychology pricing
  const servicePricing = {
    instagram: {
      followers: { 
        basePrice: 0.35, // ₹350 per 1K (psychology: ₹349)
        min: 100, max: 50000, 
        packages: [100, 500, 1000, 2500, 5000, 10000],
        starterPrice: 0.25, // Budget tier
        premiumPrice: 0.45  // Premium tier
      },
      likes: { 
        basePrice: 0.12, // ₹120 per 1K (psychology: ₹129)
        min: 50, max: 100000, 
        packages: [50, 250, 500, 1000, 2500, 5000],
        starterPrice: 0.09,
        premiumPrice: 0.18
      },
      comments: { 
        basePrice: 8, // ₹8 each (psychology: ₹9)
        min: 10, max: 1000, 
        packages: [10, 25, 50, 100, 250, 500],
        starterPrice: 6,
        premiumPrice: 12
      },
      views: { 
        basePrice: 0.015, // ₹15 per 1K (psychology: ₹19)
        min: 1000, max: 1000000, 
        packages: [1000, 5000, 10000, 25000, 50000, 100000],
        starterPrice: 0.01,
        premiumPrice: 0.025
      },
      saves: { 
        basePrice: 0.40, // ₹400 per 1K (psychology: ₹399)
        min: 25, max: 10000, 
        packages: [25, 100, 250, 500, 1000, 2500],
        starterPrice: 0.30,
        premiumPrice: 0.55
      },
      shares: { 
        basePrice: 0.35, 
        min: 25, max: 5000, 
        packages: [25, 100, 250, 500, 1000, 2000],
        starterPrice: 0.25,
        premiumPrice: 0.50
      }
    },
    youtube: {
      subscribers: { 
        basePrice: 0.80, // ₹800 per 1K (psychology: ₹799)
        min: 50, max: 10000, 
        packages: [50, 100, 250, 500, 1000, 2500],
        starterPrice: 0.60,
        premiumPrice: 1.10
      },
      views: { 
        basePrice: 0.015, // ₹15 per 1K (psychology: ₹19)
        min: 1000, max: 1000000, 
        packages: [1000, 5000, 10000, 25000, 50000, 100000],
        starterPrice: 0.01,
        premiumPrice: 0.025
      },
      likes: { 
        basePrice: 0.15, // ₹150 per 1K (psychology: ₹149)
        min: 50, max: 50000, 
        packages: [50, 250, 500, 1000, 2500, 5000],
        starterPrice: 0.11,
        premiumPrice: 0.22
      },
      comments: { 
        basePrice: 10, // ₹10 each (psychology: ₹99)
        min: 10, max: 500, 
        packages: [10, 25, 50, 100, 200, 300],
        starterPrice: 7,
        premiumPrice: 15
      },
      shares: { 
        basePrice: 0.50, 
        min: 25, max: 5000, 
        packages: [25, 100, 250, 500, 1000, 2000],
        starterPrice: 0.35,
        premiumPrice: 0.75
      },
      watchtime: { 
        basePrice: 1.50, // ₹1500 per 1K mins
        min: 100, max: 10000, 
        packages: [100, 500, 1000, 2500, 5000, 7500],
        starterPrice: 1.00,
        premiumPrice: 2.00
      }
    },
    facebook: {
      page_likes: { 
        basePrice: 0.35, 
        min: 100, max: 25000, 
        packages: [100, 500, 1000, 2500, 5000, 10000],
        starterPrice: 0.25,
        premiumPrice: 0.50
      },
      post_likes: { 
        basePrice: 0.12, 
        min: 50, max: 50000, 
        packages: [50, 250, 500, 1000, 2500, 5000],
        starterPrice: 0.08,
        premiumPrice: 0.18
      },
      comments: { 
        basePrice: 9, 
        min: 10, max: 500, 
        packages: [10, 25, 50, 100, 200, 300],
        starterPrice: 6,
        premiumPrice: 14
      },
      shares: { 
        basePrice: 0.40, 
        min: 25, max: 5000, 
        packages: [25, 100, 250, 500, 1000, 2000],
        starterPrice: 0.28,
        premiumPrice: 0.60
      },
      video_views: { 
        basePrice: 0.012, 
        min: 1000, max: 500000, 
        packages: [1000, 5000, 10000, 25000, 50000, 100000],
        starterPrice: 0.008,
        premiumPrice: 0.020
      },
      followers: { 
        basePrice: 0.60, 
        min: 100, max: 15000, 
        packages: [100, 500, 1000, 2500, 5000, 7500],
        starterPrice: 0.45,
        premiumPrice: 0.85
      }
    },
    tiktok: {
      followers: { 
        basePrice: 0.40, 
        min: 100, max: 25000, 
        packages: [100, 500, 1000, 2500, 5000, 10000],
        starterPrice: 0.28,
        premiumPrice: 0.55
      },
      likes: { 
        basePrice: 0.10, 
        min: 100, max: 100000, 
        packages: [100, 500, 1000, 2500, 5000, 10000],
        starterPrice: 0.07,
        premiumPrice: 0.15
      },
      views: { 
        basePrice: 0.008, 
        min: 1000, max: 1000000, 
        packages: [1000, 5000, 10000, 25000, 50000, 100000],
        starterPrice: 0.005,
        premiumPrice: 0.015
      },
      comments: { 
        basePrice: 8, 
        min: 10, max: 1000, 
        packages: [10, 25, 50, 100, 250, 500],
        starterPrice: 5,
        premiumPrice: 12
      },
      shares: { 
        basePrice: 0.30, 
        min: 25, max: 10000, 
        packages: [25, 100, 250, 500, 1000, 2500],
        starterPrice: 0.20,
        premiumPrice: 0.45
      },
      favorites: { 
        basePrice: 0.40, 
        min: 50, max: 10000, 
        packages: [50, 250, 500, 1000, 2500, 5000],
        starterPrice: 0.28,
        premiumPrice: 0.55
      }
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

  const tiers = {
    starter: {
      name: 'Starter',
      description: 'Perfect for beginners',
      color: 'from-gray-400 to-gray-500',
      features: ['Basic delivery', 'Standard speed', 'Email support']
    },
    growth: {
      name: 'Growth',
      description: 'Most popular choice',
      color: 'from-green-500 to-emerald-600',
      features: ['Fast delivery', 'High quality', 'Priority support', 'Best value'],
      popular: true
    },
    premium: {
      name: 'Premium',
      description: 'For maximum results',
      color: 'from-amber-500 to-orange-600',
      features: ['Instant delivery', 'Premium quality', '24/7 support', '专属客服']
    }
  }

  const config = platformConfig[platform] || platformConfig.instagram
  const pricing = servicePricing[platform]?.[selectedService?.id] || servicePricing.instagram.followers
  const hasSelectedPosts = selectedPosts && selectedPosts.length > 0

  const getPriceForTier = () => {
    switch(selectedTier) {
      case 'starter': return pricing.starterPrice
      case 'premium': return pricing.premiumPrice
      default: return pricing.basePrice
    }
  }

  const getDeliveryTime = () => {
    switch(selectedTier) {
      case 'starter': return '3-7 days'
      case 'premium': return 'Instant'
      default: return '1-3 days'
    }
  }

  useEffect(() => {
    const progress = ((quantity - pricing.min) / (pricing.max - pricing.min)) * 100
    setProgressValue(progress)
  }, [quantity, pricing.min, pricing.max])

  const calculatePrice = () => {
    const baseTotal = quantity * getPriceForTier()
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
        appliedCoupon,
        tier: selectedTier
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">

        {/* Premium Profile Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-8 border border-white/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100/50 to-orange-100/50 rounded-full translate-y-12 -translate-x-12"></div>
          
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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Tier Selection */}
          <div className="xl:col-span-2">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/50 mb-4 sm:mb-6">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-purple-50 rounded-full -translate-y-20 translate-x-20 opacity-50"></div>
              
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  Select the perfect plan for your <span className={`font-semibold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{selectedService?.name}</span> needs
                </p>
                
                {/* Tier Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {Object.entries(tiers).map(([key, tier]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedTier(key)}
                      className={`relative cursor-pointer rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
                        selectedTier === key 
                          ? 'ring-4 ring-offset-2 ring-purple-500 shadow-xl transform scale-105' 
                          : 'hover:shadow-lg border border-gray-200'
                      }`}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            POPULAR
                          </span>
                        </div>
                      )}
                      
                      <div className={`text-center mb-3`}>
                        <h3 className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                          {tier.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">{tier.description}</p>
                      </div>
                      
                      <div className="space-y-1.5 sm:space-y-2">
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Signals */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 border border-green-200">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔒</div>
                      <div className="text-xs sm:text-sm font-semibold text-green-800">No Password Required</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">⚡</div>
                      <div className="text-xs sm:text-sm font-semibold text-green-800">{getDeliveryTime()} Delivery</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔄</div>
                      <div className="text-xs sm:text-sm font-semibold text-green-800">7-Day Refill</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">💯</div>
                      <div className="text-xs sm:text-sm font-semibold text-green-800">Money Back Guarantee</div>
                    </div>
                  </div>
                </div>

                {/* Quantity Selection */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Select Quantity</h2>
                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  Choose the perfect amount of <span className={`font-semibold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{selectedService?.name}</span> for your needs
                </p>
                
                <div className="text-center mb-6 sm:mb-8">
                  <div className="relative inline-block">
                    <div className="relative group">
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${config.color} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                      <div className="relative bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105">
                        <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                          {quantity.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
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
                          <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full shadow-lg"></div>
                          </div>
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
                    <span className="hidden sm:inline">+{getQuantityIncrement().toLocaleString()}</span>
                    <span>{pricing.max.toLocaleString()}</span>
                  </div>
                  
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

                {/* Distribution Info */}
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
                    <div className="flex justify-between sm:block">
                      <span className="text-blue-700">Delivery:</span>
                      <span className="font-bold text-blue-900 sm:ml-2">{getDeliveryTime()}</span>
                    </div>
                    <div className="flex justify-between sm:block">
                      <span className="text-blue-700">Platform:</span>
                      <span className="font-bold text-blue-900 sm:ml-2 capitalize">{platform}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Section */}
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

          {/* Price Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-100 sticky top-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Plan:</span>
                  <span className={`font-semibold bg-gradient-to-r ${tiers[selectedTier].color} bg-clip-text text-transparent`}>
                    {tiers[selectedTier].name}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold truncate ml-2">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{quantity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-semibold">{getDeliveryTime()}</span>
                </div>
                
                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${(quantity * getPriceForTier()).toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-xs sm:text-sm text-green-600 mb-2">
                      <span>Discount ({(appliedCoupon.discount * 100).toFixed(0)}%):</span>
                      <span>-${((quantity * getPriceForTier()) * appliedCoupon.discount).toFixed(2)}</span>
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

              {/* Trust badges */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicePricingPage

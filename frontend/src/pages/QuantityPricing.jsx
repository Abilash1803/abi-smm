import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

const QuantityPricing = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, selectedService, profileData, selectedPosts } = location.state || {}
  
  const [quantity, setQuantity] = useState(1000)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponCode, setCouponCode] = useState('')

  // Service pricing based on platform and service type
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
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok', bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' }
  }

  const config = platformConfig[platform] || platformConfig.instagram
  const pricing = servicePricing[platform]?.[selectedService?.id] || servicePricing.instagram.followers

  const calculatePrice = () => {
    const baseTotal = quantity * pricing.basePrice
    const discount = appliedCoupon ? appliedCoupon.discount : 0
    return baseTotal * (1 - discount)
  }

  const getQuantityPerPost = () => {
    return Math.floor(quantity / selectedPosts.length)
  }

  const getQuantityIncrement = () => {
    // Determine increment based on service type and typical quantities
    const serviceId = selectedService?.id
    
    // Small increment services (comments, subscribers for some platforms)
    const smallIncrementServices = ['comments', 'subscribers', 'shares', 'saves', 'favorites']
    
    // Large increment services (views, likes with high volumes)
    const largeIncrementServices = ['views', 'video_views', 'watchtime']
    
    if (smallIncrementServices.includes(serviceId)) {
      return 25 // Smaller increment for comments, subscribers, etc.
    } else if (largeIncrementServices.includes(serviceId)) {
      return 1000 // Larger increment for views, watch time, etc.
    } else {
      return 100 // Default increment for likes, followers, etc.
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
    <div className={`min-h-screen ${config.bgColor} py-8 px-4`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
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
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {profileData?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">@{profileData?.username}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Service: <span className="font-semibold">{selectedService?.name}</span></span>
                <span>•</span>
                <span>Posts: <span className="font-semibold">{selectedPosts?.length}</span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quantity Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Quantity for <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{selectedService?.name}</span>
              </h2>
              
              {/* Quantity Slider with Arrow Controls */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Quantity</span>
                  <span className="text-2xl font-bold text-gray-900">{quantity.toLocaleString()}</span>
                </div>
                
                {/* Slider with Side Arrows */}
                <div className="relative flex items-center gap-3 mb-4">
                  {/* Left Arrow */}
                  <button
                    onClick={() => {
                      const increment = getQuantityIncrement()
                      const newQuantity = Math.max(pricing.min, quantity - increment)
                      setQuantity(newQuantity)
                    }}
                    disabled={quantity <= pricing.min}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                      quantity <= pricing.min
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : `bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 hover:shadow-sm transform hover:scale-105`
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  
                  {/* Slider Track */}
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min={pricing.min}
                      max={pricing.max}
                      step={getQuantityIncrement()}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      onKeyDown={(e) => {
                        const increment = getQuantityIncrement()
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                          e.preventDefault()
                          const newQuantity = Math.max(pricing.min, quantity - increment)
                          setQuantity(newQuantity)
                        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                          e.preventDefault()
                          const newQuantity = Math.min(pricing.max, quantity + increment)
                          setQuantity(newQuantity)
                        }
                      }}
                      className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  {/* Right Arrow */}
                  <button
                    onClick={() => {
                      const increment = getQuantityIncrement()
                      const newQuantity = Math.min(pricing.max, quantity + increment)
                      setQuantity(newQuantity)
                    }}
                    disabled={quantity >= pricing.max}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                      quantity >= pricing.max
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : `bg-white border-2 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600 hover:shadow-sm transform hover:scale-105`
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
                
                {/* Increment Info */}
                <div className="text-center mb-4">
                  <span className="text-sm text-gray-500">
                    Click arrows to adjust by {getQuantityIncrement().toLocaleString()} • Range: {pricing.min.toLocaleString()} - {pricing.max.toLocaleString()}
                  </span>
                </div>
                
                {/* Package Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {pricing.packages.map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setQuantity(pkg)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        quantity === pkg
                          ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pkg >= 1000 ? `${pkg/1000}K` : pkg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distribution Info */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-3">Distribution Breakdown</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Total {selectedService?.name}:</span>
                    <span className="font-bold text-blue-900 ml-2">{quantity.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Per Post:</span>
                    <span className="font-bold text-blue-900 ml-2">{getQuantityPerPost().toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Selected Posts:</span>
                    <span className="font-bold text-blue-900 ml-2">{selectedPosts?.length}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Platform:</span>
                    <span className="font-bold text-blue-900 ml-2 capitalize">{platform}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Apply Coupon Code</h3>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                
                {/* Available Coupons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(coupons).map(([code, coupon]) => (
                    <div
                      key={code}
                      onClick={() => setCouponCode(code)}
                      className="border-2 border-dashed border-green-300 bg-green-50 p-3 rounded-xl cursor-pointer hover:bg-green-100 transition-colors"
                    >
                      <div className="font-semibold text-green-700">{code}</div>
                      <div className="text-sm text-green-600">{coupon.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{quantity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Posts:</span>
                  <span className="font-semibold">{selectedPosts?.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Per Post:</span>
                  <span className="font-semibold">{getQuantityPerPost().toLocaleString()}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${(quantity * pricing.basePrice).toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600 mb-2">
                      <span>Discount ({(appliedCoupon.discount * 100).toFixed(0)}%):</span>
                      <span>-${((quantity * pricing.basePrice) * appliedCoupon.discount).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className={`font-bold text-2xl bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                      ${calculatePrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className={`w-full bg-gradient-to-r ${config.color} text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuantityPricing
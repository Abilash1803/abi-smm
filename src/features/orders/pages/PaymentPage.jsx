import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'

const PaymentPage = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, selectedService, profileData, selectedPosts, quantity, totalPrice, appliedCoupon } = location.state || {}
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe')
  const [billingAddress, setBillingAddress] = useState({
    country: 'US',
    zipCode: ''
  })

  const platformConfig = {
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok', bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' }
  }

  const config = platformConfig[platform] || platformConfig.instagram

  const paymentMethods = [
    { 
      id: 'stripe', 
      name: 'Stripe', 
      description: 'Secure payment processing',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
      logos: ['stripe']
    },
    { 
      id: 'razorpay', 
      name: 'Razorpay', 
      description: 'UPI, Cards, Net Banking & Wallets',
      logo: 'https://razorpay.com/assets/razorpay-logo.svg',
      logos: ['razorpay']
    }
  ]

  const handlePayment = () => {
    // Simulate payment processing
    navigate('/processing', {
      state: {
        username,
        platform,
        selectedService,
        profileData,
        selectedPosts,
        quantity,
        totalPrice,
        paymentMethod: selectedPaymentMethod,
        orderId: `ORD-${Date.now()}`
      }
    })
  }

  const getQuantityPerPost = () => {
    if (!selectedPosts || selectedPosts.length === 0) return quantity
    return Math.floor(quantity / selectedPosts.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Premium Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full shadow-lg mb-4 border border-white/50">
            <span className="text-xs sm:text-sm text-gray-600 font-medium">Step 4 of 4 • Secure Payment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Complete Your <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>Payment</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base px-4">Your information is protected with bank-level security</p>
        </div>

        {/* Responsive Layout Container */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Premium Payment Methods Section */}
          <div className="xl:col-span-2">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/50 relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-purple-100/30 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/30 to-blue-100/30 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Secure Payment</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Choose your preferred payment method</p>
                  </div>
                </div>
                
                {/* Premium Payment Method Selection */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`cursor-pointer border-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 relative overflow-hidden group ${
                        selectedPaymentMethod === method.id
                          ? `border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg`
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center p-2 ${
                            selectedPaymentMethod === method.id ? 'bg-white shadow-md' : 'bg-gray-50'
                          }`}>
                            <img 
                              src={method.logo} 
                              alt={`${method.name} logo`} 
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600 hidden">
                              {method.name.substring(0, 3).toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{method.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {/* Payment method logos */}
                          <div className="flex items-center gap-1 sm:gap-2">
                            {method.logos.map((logo, index) => (
                              <div key={index} className="w-6 h-4 sm:w-8 sm:h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                                {logo.toUpperCase().substring(0, 3)}
                              </div>
                            ))}
                          </div>
                          
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedPaymentMethod === method.id
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedPaymentMethod === method.id && (
                              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Method Info */}
                <div className="border-t pt-6 sm:pt-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white shadow-md flex items-center justify-center p-1.5 sm:p-2">
                        <img 
                          src={paymentMethods.find(m => m.id === selectedPaymentMethod)?.logo} 
                          alt={`${paymentMethods.find(m => m.id === selectedPaymentMethod)?.name} logo`} 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600 hidden">
                          {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name.substring(0, 3).toUpperCase()}
                        </div>
                      </div>
                      <h3 className="font-semibold text-blue-900 text-sm sm:text-base">
                        {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                      </h3>
                    </div>
                    <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
                      {selectedPaymentMethod === 'stripe' 
                        ? 'You will be redirected to Stripe\'s secure payment portal to complete your transaction. Stripe is trusted by millions of businesses worldwide.'
                        : selectedPaymentMethod === 'razorpay'
                        ? 'You will be redirected to Razorpay\'s secure payment gateway. Pay using UPI, Cards, Net Banking, or Digital Wallets.'
                        : `You will be redirected to complete your payment securely with ${paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}.`
                      }
                    </p>
                  </div>
                </div>

                {/* Security Features */}
                <div className="mt-6 sm:mt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>PCI Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Money Back</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Order Summary - Mobile Responsive */}
          <div className="xl:col-span-1">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/50 sticky top-4 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-100/30 to-blue-100/30 rounded-full -translate-y-10 translate-x-10"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>
                
                {/* Profile Info - Mobile Optimized */}
                <div className="flex items-center gap-3 mb-4 sm:mb-6 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
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
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {profileData?.username?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">@{profileData?.username || 'user'}</div>
                    <div className="text-xs sm:text-sm text-gray-600 capitalize">{platform || 'platform'}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${config.color} text-white`}>
                    {config.name}
                  </div>
                </div>

                {/* Order Details - Mobile Responsive */}
                <div className="space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold truncate ml-2">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{quantity?.toLocaleString()}</span>
                  </div>
                  {selectedPosts && selectedPosts.length > 0 ? (
                    <>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Posts Selected:</span>
                        <span className="font-semibold">{selectedPosts.length}</span>
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
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-xs sm:text-sm text-green-600">
                      <span>Discount Applied:</span>
                      <span className="font-semibold">{(appliedCoupon.discount * 100).toFixed(0)}% OFF</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900 text-sm sm:text-base">Total Amount:</span>
                      <span className={`font-bold text-xl sm:text-2xl bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                        ${totalPrice?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Premium Security Features */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-green-100">
                  <div className="flex items-center gap-2 text-green-800 text-xs sm:text-sm mb-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold">256-bit SSL Encryption</span>
                  </div>
                  <p className="text-green-700 text-xs leading-relaxed">
                    Your payment information is protected with bank-level security. We never store your card details.
                  </p>
                </div>

                {/* Money Back Guarantee */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-800 text-xs sm:text-sm mb-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold">30-Day Money Back</span>
                  </div>
                  <p className="text-blue-700 text-xs leading-relaxed">
                    Not satisfied? Get a full refund within 30 days, no questions asked.
                  </p>
                </div>

                {/* Premium Pay Button */}
                <button
                  onClick={handlePayment}
                  className={`w-full bg-gradient-to-r ${config.color} text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Pay ${totalPrice?.toFixed(2)} Securely
                  </span>
                  
                  {/* Button shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>

                {/* Trust Indicators */}
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Instant Delivery</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>24/7 Support</span>
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

export default PaymentPage
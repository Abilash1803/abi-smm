import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

const OrderPayment = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, selectedService, profileData, selectedPosts, quantity, totalPrice, appliedCoupon } = location.state || {}
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
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
      id: 'card', 
      name: 'Credit/Debit Card', 
      description: 'Visa, Mastercard, American Express',
      logos: [
        'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
        'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg'
      ]
    },
    { 
      id: 'apple', 
      name: 'Apple Pay', 
      description: 'Quick payment with Touch ID',
      logos: ['https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg']
    },
    { 
      id: 'stripe', 
      name: 'Stripe', 
      description: 'Secure payment processing',
      logos: ['https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg']
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
    return Math.floor(quantity / (selectedPosts?.length || 1))
  }

  return (
    <div className={`min-h-screen ${config.bgColor} py-8 px-4`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md mb-4">
            <span className="text-sm text-gray-600">Step 4 of 4</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
              
              {/* Payment Method Selection */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`cursor-pointer border-2 rounded-2xl p-4 transition-all ${
                      selectedPaymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.logos.map((logo, index) => (
                          <img 
                            key={index}
                            src={logo} 
                            alt={`${method.name} logo`} 
                            className="h-6 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Details Form (shown when card is selected) */}
              {selectedPaymentMethod === 'card' && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Card Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Other Payment Method Info */}
              {selectedPaymentMethod !== 'card' && (
                <div className="border-t pt-6">
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {paymentMethods.find(m => m.id === selectedPaymentMethod)?.logos.map((logo, index) => (
                          <img 
                            key={index}
                            src={logo} 
                            alt={`${paymentMethods.find(m => m.id === selectedPaymentMethod)?.name} logo`} 
                            className="h-8 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        ))}
                      </div>
                      <h3 className="font-semibold text-blue-900">
                        {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                      </h3>
                    </div>
                    <p className="text-blue-800 text-sm">
                      {selectedPaymentMethod === 'apple' 
                        ? 'Use Touch ID or Face ID to complete your payment securely with Apple Pay.'
                        : selectedPaymentMethod === 'stripe'
                        ? 'You will be redirected to Stripe\'s secure payment portal to complete your transaction.'
                        : `You will be redirected to complete your payment securely with ${paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}.`
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Final Order Summary</h3>
              
              {/* Profile Info */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
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
                <div>
                  <div className="font-semibold text-gray-900">@{profileData?.username || 'user'}</div>
                  <div className="text-sm text-gray-600 capitalize">{platform || 'platform'}</div>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{quantity?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Posts Selected:</span>
                  <span className="font-semibold">{selectedPosts?.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Per Post:</span>
                  <span className="font-semibold">{getQuantityPerPost().toLocaleString()}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount Applied:</span>
                    <span className="font-semibold">{(appliedCoupon.discount * 100).toFixed(0)}% OFF</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total Amount:</span>
                    <span className={`font-bold text-2xl bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                      ${totalPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-green-800 text-sm">
                  <span>🔒</span>
                  <span className="font-semibold">Secure Payment</span>
                </div>
                <p className="text-green-700 text-xs mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                className={`w-full bg-gradient-to-r ${config.color} text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
              >
                Pay ${totalPrice?.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPayment
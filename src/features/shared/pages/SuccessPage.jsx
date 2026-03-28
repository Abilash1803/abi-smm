import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

/**
 * Success Page Component
 * Displays success messages and provides next steps
 * 
 * BACKEND INTEGRATION POINTS:
 * - Success tracking: Log successful operations for analytics
 * - User guidance: Provide personalized next steps
 * - Conversion tracking: Track successful user journeys
 */
export default function SuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [countdown, setCountdown] = useState(5)
  
  // Get success details from navigation state
  const { 
    title = 'Success!',
    message = 'Your operation completed successfully.',
    nextAction = 'Continue',
    nextRoute = '/',
    platform = null,
    username = null,
    autoRedirect = true
  } = location.state || {}

  // Auto-redirect countdown
  useEffect(() => {
    if (!autoRedirect) return

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate(nextRoute)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate, nextRoute, autoRedirect])

  // BACKEND TODO: Log success for analytics
  useEffect(() => {
    // POST /api/analytics/track-success - Track successful operations
    console.log('Success logged:', {
      platform,
      username,
      message,
      timestamp: new Date().toISOString(),
      nextRoute
    })
  }, [platform, username, message, nextRoute])

  const handleContinue = () => {
    navigate(nextRoute)
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          
          {platform && username && (
            <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Profile Found:</p>
              <p className="font-medium text-gray-900">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}: @{username}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            {nextAction}
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
          >
            Go to Home Page
          </button>
        </div>

        {/* Auto-redirect notice */}
        {autoRedirect && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Automatically continuing in {countdown} seconds
            </p>
            <button
              onClick={() => setCountdown(0)}
              className="text-sm text-blue-600 hover:text-blue-700 underline mt-1"
            >
              Cancel auto-redirect
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
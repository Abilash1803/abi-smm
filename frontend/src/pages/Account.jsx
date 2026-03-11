import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/Button'

const Account = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform } = location.state || {}
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!username || !platform) {
      navigate('/')
      return
    }
  }, [username, platform, navigate])

  const handleContinue = () => {
    navigate('/posts-selection', {
      state: {
        platform,
        username
      }
    })
  }

  const getPlatformIcon = () => {
    const icons = {
      instagram: '📷',
      tiktok: '🎵',
      youtube: '▶️',
      facebook: '👥'
    }
    return icons[platform] || '📱'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{getPlatformIcon()}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Account Verified
            </h1>
            <p className="text-gray-600">
              @{username} on {platform}
            </p>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleContinue} size="lg">
              Continue to Service Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account

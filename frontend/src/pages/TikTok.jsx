import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TikTok = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    setIsSearching(true)

    setTimeout(() => {
      setIsSearching(false)
      navigate('/account-profile', {
        state: {
          platform: 'tiktok',
          username: username.trim()
        }
      })
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Buy TikTok Services for Faster Popularity
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Grow your TikTok profile with our premium services. Search for your account to get started.
          </p>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden border-2 border-gray-200 focus-within:border-primary-500 transition-colors">
              <div className="pl-6 pr-3 flex items-center">
                <span className="text-3xl">🎵</span>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter TikTok username"
                className="flex-1 py-5 px-3 text-lg text-gray-700 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={isSearching}
                className="bg-primary-600 text-white px-10 py-5 text-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isSearching ? 'SEARCHING...' : 'SEARCH'}
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <span className="font-medium">Secure Service</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <span className="font-medium">Affordable For All</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⏱️</span>
            <span className="font-medium">Saves Your Time</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex text-3xl">⭐⭐⭐⭐⭐</div>
            <div className="text-4xl font-bold text-gray-900">4.9</div>
          </div>
          <div className="text-center">
            <div className="text-gray-700 font-medium mb-1">Rated 4.9 out of 5</div>
            <div className="text-gray-600">Based on <span className="font-semibold">1678+</span> Reviews</div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Enter your TikTok username to view your profile and select videos to boost
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Your information is secure and never shared</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TikTok

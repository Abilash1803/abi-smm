import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socialMediaAPI } from '../utils/socialMedia'
import { useTheme } from '../context/ThemeContext'

const Instagram = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [username, setUsername] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    setIsSearching(true)
    setError('')

    try {
      const cleanUsername = username.trim().replace('@', '')
      const response = await socialMediaAPI.fetchInstagramProfile(cleanUsername)
      
      if (response.success || response.data) {
        navigate('/account-profile', {
          state: {
            platform: 'instagram',
            username: cleanUsername,
            profileData: response.data,
            isFallback: response.isFallback
          }
        })
      } else {
        setError('Profile not found. Please check the username and try again.')
      }
    } catch (err) {
      navigate('/account-profile', {
        state: {
          platform: 'instagram',
          username: username.trim().replace('@', '')
        }
      })
    } finally {
      setIsSearching(false)
    }
  }

  const services = [
    { icon: '👥', name: 'Followers', desc: 'Gain real followers', color: 'bg-pink-100 dark:bg-pink-900/30' },
    { icon: '❤️', name: 'Likes', desc: 'Boost post likes', color: 'bg-pink-100 dark:bg-pink-900/30' },
    { icon: '👁️', name: 'Views', desc: 'Increase reach', color: 'bg-pink-100 dark:bg-pink-900/30' },
    { icon: '💬', name: 'Comments', desc: 'Get more comments', color: 'bg-pink-100 dark:bg-pink-900/30' }
  ]

  const features = [
    { icon: '🛡️', title: 'Real Followers', desc: 'Genuine active accounts' },
    { icon: '⚡', title: 'Instant Start', desc: 'Results within hours' },
    { icon: '🔒', title: 'Safe & Secure', desc: 'Account protection guaranteed' },
    { icon: '💬', title: '24/7 Support', desc: 'Always here to help' }
  ]

  return (
    <div className={`min-h-screen pt-20 lg:pt-24 pb-12 px-4 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-950/30 to-gray-900' 
        : 'bg-gradient-to-br from-pink-50 via-white to-purple-50'
    }`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl shadow-lg mb-4 hover:scale-110 transition-transform duration-300">
            <svg className="w-8 sm:w-10 h-8 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? 'text-white' : 'text-gray-900'}>Grow Your </span>
            <span className="text-pink-500">Instagram</span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}> Following</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Get real Instagram followers, likes, views, and comments to grow your profile organically.
          </p>
        </div>

        <div className="mb-10">
          <form onSubmit={handleSearch}>
            <div className={`rounded-2xl shadow-xl overflow-hidden border-2 transition-all ${
              isDark 
                ? 'bg-gray-800 border-gray-700 focus-within:border-pink-500' 
                : 'bg-white border-gray-100 focus-within:border-pink-500'
            }`}>
              <div className="flex flex-col sm:flex-row">
                <div className="flex items-center px-5 py-4">
                  <span className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>@</span>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace('@', ''))}
                  placeholder="Enter Instagram username"
                  className={`flex-1 py-4 px-2 text-lg focus:outline-none transition-colors ${
                    isDark ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-700 placeholder-gray-400'
                  }`}
                  required
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 text-white px-8 sm:px-10 py-4 text-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span className="hidden sm:inline">SEARCHING...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      <span className="hidden sm:inline">SEARCH</span>
                      <span className="sm:hidden">Go</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
          {error && (
            <p className="mt-3 text-center text-red-500 font-medium">{error}</p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {services.map((service, idx) => (
            <div key={idx} className={`rounded-xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center ${service.color}`}>
              <div className="text-3xl mb-2">{service.icon}</div>
              <div className="font-semibold text-gray-900 dark:text-white">{service.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{service.desc}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="text-lg">{feature.icon}</span>
              </div>
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature.title}</span>
            </div>
          ))}
        </div>

        <div className={`rounded-2xl shadow-lg p-6 sm:p-8 max-w-md mx-auto text-center ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex text-amber-400">⭐⭐⭐⭐⭐</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9</div>
          </div>
          <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            <div className="font-medium mb-1">Rated 4.9 out of 5</div>
            <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Based on <span className="font-semibold text-pink-500">3,200+</span> Reviews
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className={`mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Enter your Instagram username to get started
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            <span>Your information is secure and never shared</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instagram

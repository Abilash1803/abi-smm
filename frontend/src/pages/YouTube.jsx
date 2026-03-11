import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socialMediaAPI } from '../utils/socialMedia'
import { useTheme } from '../context/ThemeContext'
import Button from '../components/common/Button'

const YouTube = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [username, setUsername] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const [searchMode, setSearchMode] = useState('channel')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    setIsSearching(true)
    setError('')

    try {
      const response = await socialMediaAPI.fetchYouTubeChannel(username.trim())
      
      if (response.success || response.data) {
        navigate('/account-profile', {
          state: {
            platform: 'youtube',
            username: username.trim(),
            channelData: response.data,
            isFallback: response.isFallback
          }
        })
      } else {
        setError('Channel not found. Please check the name and try again.')
      }
    } catch (err) {
      navigate('/account-profile', {
        state: {
          platform: 'youtube',
          username: username.trim()
        }
      })
    } finally {
      setIsSearching(false)
    }
  }

  const services = [
    { icon: '👁️', name: 'Views', desc: 'Increase video views', color: 'bg-red-100 dark:bg-red-900/30' },
    { icon: '👥', name: 'Subscribers', desc: 'Gain real subscribers', color: 'bg-red-100 dark:bg-red-900/30' },
    { icon: '❤️', name: 'Likes', desc: 'Boost video likes', color: 'bg-red-100 dark:bg-red-900/30' },
    { icon: '💬', name: 'Comments', desc: 'Get more comments', color: 'bg-red-100 dark:bg-red-900/30' }
  ]

  const features = [
    { icon: '🛡️', title: 'Secure Service', desc: 'Your account is safe with us' },
    { icon: '⚡', title: 'Instant Delivery', desc: 'Start seeing results within minutes' },
    { icon: '💬', title: '24/7 Support', desc: 'We\'re here to help anytime' },
    { icon: '💰', title: 'Best Prices', desc: 'Quality service at affordable rates' }
  ]

  return (
    <div className={`min-h-screen pt-20 lg:pt-24 pb-12 px-4 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-red-50 via-white to-orange-50'
    }`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg mb-4 hover:scale-110 transition-transform duration-300">
            <svg className="w-8 sm:w-10 h-8 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? 'text-white' : 'text-gray-900'}>Boost Your </span>
            <span className="text-red-500">YouTube</span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}> Presence</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Grow your YouTube channel with real subscribers, views, likes, and comments from genuine users.
          </p>
        </div>

        <div className="mb-10">
          <form onSubmit={handleSearch}>
            <div className={`rounded-2xl shadow-xl overflow-hidden border-2 transition-all ${
              isDark 
                ? 'bg-gray-800 border-gray-700 focus-within:border-red-500' 
                : 'bg-white border-gray-100 focus-within:border-red-500'
            }`}>
              <div className="flex flex-col">
                <div className="p-3 flex items-center justify-center sm:justify-start">
                  <div className={`flex rounded-xl p-1 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <button
                      type="button"
                      onClick={() => setSearchMode('channel')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        searchMode === 'channel' 
                          ? 'bg-white dark:bg-gray-600 shadow text-red-600 dark:text-red-400' 
                          : isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Channel
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchMode('video')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        searchMode === 'video' 
                          ? 'bg-white dark:bg-gray-600 shadow text-red-600 dark:text-red-400' 
                          : isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Video URL
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <input
                    type={searchMode === 'video' ? 'url' : 'text'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={searchMode === 'channel' ? 'Enter YouTube channel name or @username' : 'Enter YouTube video URL'}
                    className={`flex-1 py-4 px-5 text-lg focus:outline-none transition-colors ${
                      isDark ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-700 placeholder-gray-400'
                    }`}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 sm:px-10 py-4 text-lg font-semibold hover:from-red-700 hover:to-orange-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
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
              Based on <span className="font-semibold text-red-500">2,500+</span> Reviews
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className={`mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Enter your YouTube channel name to view your profile
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

export default YouTube

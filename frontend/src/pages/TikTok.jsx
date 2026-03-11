import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socialMediaAPI } from '../utils/socialMedia'
import { useTheme } from '../context/ThemeContext'

const TikTok = () => {
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
      const response = await socialMediaAPI.fetchTikTokProfile(cleanUsername)
      
      if (response.success || response.data) {
        navigate('/account-profile', {
          state: { platform: 'tiktok', username: cleanUsername, profileData: response.data, isFallback: response.isFallback }
        })
      } else {
        setError('Profile not found.')
      }
    } catch (err) {
      navigate('/account-profile', { state: { platform: 'tiktok', username: username.trim().replace('@', '') } })
    } finally {
      setIsSearching(false)
    }
  }

  const services = [
    { icon: '👁️', name: 'Views', desc: 'Increase video views', color: 'bg-cyan-100 dark:bg-cyan-900/30' },
    { icon: '👥', name: 'Followers', desc: 'Gain real followers', color: 'bg-pink-100 dark:bg-pink-900/30' },
    { icon: '❤️', name: 'Likes', desc: 'Boost video likes', color: 'bg-cyan-100 dark:bg-cyan-900/30' },
    { icon: '💬', name: 'Comments', desc: 'Get more comments', color: 'bg-pink-100 dark:bg-pink-900/30' }
  ]

  const features = [
    { icon: '🛡️', title: 'Real Engagement', desc: 'Genuine Tik' },
    { icon: 'Tok users⚡', title: 'Fast Delivery', desc: 'Results within hours' },
    { icon: '🔒', title: 'Safe Growth', desc: 'Account security first' },
    { icon: '💬', title: '24/7 Support', desc: 'Always available' }
  ]

  return (
    <div className={`min-h-screen pt-20 lg:pt-24 pb-12 px-4 transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 via-cyan-950/20 to-gray-900' : 'bg-gradient-to-br from-cyan-50 via-white to-pink-50'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-cyan-400 via-black to-pink-500 rounded-2xl shadow-lg mb-4 hover:scale-110 transition-transform">
            <svg className="w-8 sm:w-10 h-8 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className={isDark ? 'text-white' : 'text-gray-900'}>Boost Your </span>
            <span className="text-pink-500">TikTok</span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}> Presence</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Get real TikTok followers, views, likes, and comments to make your videos go viral.
          </p>
        </div>

        <div className="mb-10">
          <form onSubmit={handleSearch}>
            <div className={`rounded-2xl shadow-xl overflow-hidden border-2 transition-all ${isDark ? 'bg-gray-800 border-gray-700 focus-within:border-pink-500' : 'bg-white border-gray-100 focus-within:border-pink-500'}`}>
              <div className="flex flex-col sm:flex-row">
                <div className="flex items-center px-5 py-4"><span className="text-xl text-gray-500">@</span></div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value.replace('@', ''))} placeholder="Enter TikTok username"
                  className={`flex-1 py-4 px-2 text-lg focus:outline-none ${isDark ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-700'}`} required />
                <button type="submit" disabled={isSearching}
                  className="bg-gradient-to-r from-cyan-500 via-black to-pink-500 text-white px-8 sm:px-10 py-4 text-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSearching ? <><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg><span className="hidden sm:inline">SEARCHING...</span></> : 
                    <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><span className="hidden sm:inline">SEARCH</span><span className="sm:hidden">Go</span></>}
                </button>
              </div>
            </div>
          </form>
          {error && <p className="mt-3 text-center text-red-500 font-medium">{error}</p>}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {services.map((service, idx) => (
            <div key={idx} className={`rounded-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 text-center ${service.color}`}>
              <div className="text-3xl mb-2">{service.icon}</div>
              <div className="font-semibold text-gray-900 dark:text-white">{service.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{service.desc}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><span className="text-lg">{f.icon}</span></div>
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{f.title}</span>
            </div>
          ))}
        </div>

        <div className={`rounded-2xl shadow-lg p-6 sm:p-8 max-w-md mx-auto text-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex text-amber-400">⭐⭐⭐⭐⭐</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9</div>
          </div>
          <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            <div className="font-medium mb-1">Rated 4.9 out of 5</div>
            <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Based on <span className="font-semibold text-pink-500">4,100+</span> Reviews</div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className={`mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Enter your TikTok username to get started</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
            <span>Your information is secure</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TikTok

import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import ThemeToggle from '../common/ThemeToggle'
import { authAPI } from '../../utils/auth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [closeTimeout, setCloseTimeout] = useState(null)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = authAPI.getUser()
    setUser(loggedInUser)
  }, [location])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowUserMenu(false)
    setActiveDropdown(null)
  }, [location])

  const handleLogout = () => {
    authAPI.logout()
    setUser(null)
    setShowUserMenu(false)
    navigate('/')
  }

  const platforms = [
    {
      name: 'TikTok',
      path: '/tiktok',
      color: 'from-cyan-400 via-pink-500 to-purple-500',
      icon: '🎵',
      services: [
        { name: 'TikTok Views', service: 'views' },
        { name: 'TikTok Followers', service: 'followers' },
        { name: 'TikTok Likes', service: 'likes' },
        { name: 'TikTok Comments', service: 'comments' }
      ]
    },
    {
      name: 'Instagram',
      path: '/instagram',
      color: 'from-pink-500 via-purple-500 to-orange-500',
      icon: '📸',
      services: [
        { name: 'Instagram Followers', service: 'followers' },
        { name: 'Instagram Likes', service: 'likes' },
        { name: 'Instagram Views', service: 'views' },
        { name: 'Instagram Comments', service: 'comments' }
      ]
    },
    {
      name: 'Facebook',
      path: '/facebook',
      color: 'from-blue-600 to-blue-800',
      icon: '👥',
      services: [
        { name: 'Facebook Likes', service: 'likes' },
        { name: 'Facebook Followers', service: 'followers' },
        { name: 'Facebook Views', service: 'views' },
        { name: 'Facebook Comments', service: 'comments' }
      ]
    },
    {
      name: 'YouTube',
      path: '/youtube',
      color: 'from-red-600 to-orange-500',
      icon: '▶️',
      services: [
        { name: 'YouTube Views', service: 'views' },
        { name: 'YouTube Subscribers', service: 'subscribers' },
        { name: 'YouTube Likes', service: 'likes' },
        { name: 'YouTube Comments', service: 'comments' }
      ]
    }
  ]

  const isActive = (path) => location.pathname === path

  const handleServiceClick = (platformPath) => {
    navigate(platformPath)
    setActiveDropdown(null)
  }

  const handleMouseEnter = (dropdown) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveDropdown(null), 300)
    setCloseTimeout(timeout)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
              S
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              SocialBoost
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('all-services')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <span>Services</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === 'all-services' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-4 border border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-4 gap-4 px-4">
                    {platforms.map((platform) => (
                      <div key={platform.name} className="space-y-2">
                        <div className="flex items-center gap-2 px-3 py-2">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-sm`}>
                            {platform.icon}
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{platform.name}</span>
                        </div>
                        <div className="space-y-1">
                          {platform.services.map((service) => (
                            <button
                              key={service.service}
                              onClick={() => handleServiceClick(platform.path)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors"
                            >
                              {service.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {platforms.slice(0, 4).map((platform) => (
              <Link
                key={platform.name}
                to={platform.path}
                className={`px-4 py-2 font-medium rounded-lg transition-all ${
                  isActive(platform.path)
                    ? 'bg-gradient-to-r ' + platform.color + ' text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {platform.name}
              </Link>
            ))}

            <Link
              to="/free-trial"
              className="px-4 py-2 font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Free Trial
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl py-2 border border-gray-100 dark:border-gray-800 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                    <Link to="/my-orders" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      My Orders
                    </Link>
                    <hr className="my-2 border-gray-100 dark:border-gray-800" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {platforms.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <Link
                  to={platform.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                    isActive(platform.path) 
                      ? 'bg-gradient-to-r ' + platform.color + ' text-white' 
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <span className="text-xl">{platform.icon}</span>
                  <span className="font-medium">{platform.name}</span>
                </Link>
              </div>
            ))}
            
            <Link
              to="/free-trial"
              className="block px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              Free Trial
            </Link>

            {!user && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button fullWidth variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button fullWidth size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

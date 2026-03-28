import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../ui/Button';
import SocialPlatformIcon from '../ui/SocialPlatformIcon';
import { getFromStorage, removeFromStorage } from '../../utils/storage';

/**
 * Enhanced Navigation Bar Component
 * Modern, clean navigation matching reference design with proper spacing and layout
 * 
 * BACKEND INTEGRATION POINTS:
 * - User authentication: Connect to auth API for login/logout
 * - Platform services: Load available services from database
 * - User profile: Display user data and order history
 * - Referral system: Track referral codes and rewards
 * - Analytics: Track navigation patterns and popular services
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // BACKEND TODO: Replace with API call to check authentication status
  useEffect(() => {
    const loggedInUser = getFromStorage('user');
    setUser(loggedInUser);
  }, [location]);

  // AUTHENTICATION HANDLER - Logout user
  const handleLogout = () => {
    removeFromStorage('token');
    removeFromStorage('user');
    setUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  // REFERRAL HANDLER - Navigate to referral page
  const handleReferFriend = () => {
    navigate('/refer-friend');
    setActiveDropdown(null);
  };

  // BACKEND TODO: Load platform data from API
  const platforms = [
    {
      name: 'TikTok',
      path: '/tiktok',
      platform: 'tiktok',
      gradient: 'from-black to-gray-800',
      hoverColor: 'hover:bg-black/10',
      services: [
        { name: 'TikTok Views', service: 'views', price: '$5.99', popular: true },
        { name: 'TikTok Followers', service: 'followers', price: '$9.99', popular: true },
        { name: 'TikTok Likes', service: 'likes', price: '$3.99', popular: false },
        { name: 'TikTok Comments', service: 'comments', price: '$7.99', popular: false }
      ]
    },
    {
      name: 'Instagram',
      path: '/instagram',
      platform: 'instagram',
      gradient: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:bg-pink-50',
      services: [
        { name: 'Instagram Followers', service: 'followers', price: '$12.99', popular: true },
        { name: 'Instagram Likes', service: 'likes', price: '$4.99', popular: true },
        { name: 'Instagram Views', service: 'views', price: '$6.99', popular: false },
        { name: 'Instagram Comments', service: 'comments', price: '$8.99', popular: false }
      ]
    },
    {
      name: 'Facebook',
      path: '/facebook',
      platform: 'facebook',
      gradient: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:bg-blue-50',
      services: [
        { name: 'Facebook Likes', service: 'likes', price: '$3.99', popular: true },
        { name: 'Facebook Followers', service: 'followers', price: '$8.99', popular: false },
        { name: 'Facebook Views', service: 'views', price: '$5.99', popular: false },
        { name: 'Facebook Comments', service: 'comments', price: '$7.99', popular: false }
      ]
    },
    {
      name: 'YouTube',
      path: '/youtube',
      platform: 'youtube',
      gradient: 'from-red-500 to-red-600',
      hoverColor: 'hover:bg-red-50',
      services: [
        { name: 'YouTube Views', service: 'views', price: '$4.99', popular: true },
        { name: 'YouTube Subscribers', service: 'subscribers', price: '$15.99', popular: true },
        { name: 'YouTube Likes', service: 'likes', price: '$6.99', popular: false },
        { name: 'YouTube Comments', service: 'comments', price: '$9.99', popular: false }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleServiceClick = (platformPath) => {
    navigate(platformPath);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (dropdown) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setCloseTimeout(timeout);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-gray-200/50 shadow-sm">
      <style>{`
        .nav-link {
          position: relative;
          transition: all 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background: linear-gradient(135deg, #FF6B35, #FFA500);
          transition: all 0.2s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .viralkik-logo {
          background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 50%, #E0E7FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 
            0 1px 0 rgba(139, 92, 246, 0.8),
            0 2px 0 rgba(139, 92, 246, 0.6),
            0 3px 0 rgba(139, 92, 246, 0.4),
            0 4px 0 rgba(139, 92, 246, 0.2),
            0 5px 10px rgba(139, 92, 246, 0.3);
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
        }
        .viralkik-logo::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -4px;
          right: -4px;
          bottom: -2px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.1));
          border-radius: 8px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .viralkik-logo:hover::before {
          opacity: 1;
        }
        .viralkik-logo:hover {
          transform: translateY(-1px);
          text-shadow: 
            0 2px 0 rgba(139, 92, 246, 0.8),
            0 4px 0 rgba(139, 92, 246, 0.6),
            0 6px 0 rgba(139, 92, 246, 0.4),
            0 8px 0 rgba(139, 92, 246, 0.2),
            0 10px 20px rgba(139, 92, 246, 0.4);
        }
        .refer-earn-button {
          background: linear-gradient(135deg, #10B981, #059669);
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .refer-earn-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        .login-button {
          background: linear-gradient(135deg, #374151, #1F2937);
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .login-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(55, 65, 81, 0.2);
        }
      `}</style>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo Section - Left Corner */}
          <Link 
            to="/" 
            className="flex items-center group flex-shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <span className="viralkik-logo text-2xl font-bold">
                ViralKik
              </span>
            </div>
          </Link>

          {/* Navigation Section - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-6">
              
              {/* All Services - Professional Grid Layout */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('all-services')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="nav-link text-sm font-medium transition-colors flex items-center space-x-1 text-gray-700 hover:text-[#FF6B35] px-3 py-2 rounded-lg whitespace-nowrap">
                  <span>All Services</span>
                  <svg className="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'all-services' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-[720px] bg-white rounded-xl shadow-2xl border border-gray-100 py-6 z-50"
                      onMouseEnter={() => handleMouseEnter('all-services')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="px-6 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Choose Your Platform</h3>
                        <p className="text-sm text-gray-500">Select a platform to boost your social media presence</p>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 px-6">
                        {platforms.map((platform) => (
                          <div key={platform.name} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                            {/* Platform Header */}
                            <div className={`flex items-center gap-2 p-3 bg-gradient-to-r ${platform.gradient} rounded-lg text-white mb-3`}>
                              <div className="w-5 h-5 flex items-center justify-center">
                                <SocialPlatformIcon platform={platform.platform} size="sm" />
                              </div>
                              <span className="text-sm font-semibold">{platform.name}</span>
                            </div>
                            
                            {/* Services List */}
                            <div className="space-y-2">
                              {platform.services.slice(0, 3).map((service) => (
                                <button
                                  key={service.service}
                                  onClick={() => handleServiceClick(platform.path)}
                                  className="w-full text-left px-2 py-1.5 text-xs text-gray-700 hover:text-[#FF6B35] hover:bg-white rounded transition-colors flex items-center justify-between group"
                                >
                                  <span className="font-medium">{service.name}</span>
                                  {service.popular && (
                                    <span className="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                      Popular
                                    </span>
                                  )}
                                </button>
                              ))}
                              
                              {/* View All Link */}
                              <button
                                onClick={() => handleServiceClick(platform.path)}
                                className="w-full text-center py-2 text-xs text-[#FF6B35] hover:text-[#FFA500] font-semibold transition-colors border-t border-gray-200 mt-2 pt-2"
                              >
                                View All {platform.name} Services →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Platform Navigation Items - Simplified */}
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(platform.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={platform.path}
                    className={`nav-link text-sm font-medium transition-colors flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 ${
                      isActive(platform.path)
                        ? 'text-[#FF6B35] active'
                        : 'text-gray-700 hover:text-[#FF6B35]'
                    }`}
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <SocialPlatformIcon platform={platform.platform} size="sm" />
                    </div>
                    <span className="whitespace-nowrap">{platform.name}</span>
                    <svg className="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  
                  <AnimatePresence>
                    {activeDropdown === platform.name && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50"
                        onMouseEnter={() => handleMouseEnter(platform.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="px-4 mb-2">
                          <div className="text-sm font-semibold text-gray-900">{platform.name} Services</div>
                        </div>
                        
                        <div className="space-y-0.5 px-2">
                          {platform.services.map((service) => (
                            <button
                              key={service.service}
                              onClick={() => handleServiceClick(platform.path)}
                              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <span className="text-sm text-gray-700 group-hover:text-[#FF6B35]">
                                {service.name}
                              </span>
                              {service.popular && (
                                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                                  Popular
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                        
                        <div className="border-t border-gray-100 mt-2 pt-2 px-2">
                          <button
                            onClick={() => handleServiceClick(platform.path)}
                            className="w-full text-center py-2 text-sm text-[#FF6B35] hover:text-[#FFA500] font-medium transition-colors"
                          >
                            View All Services →
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Section - Right - Hidden on small devices */}
          <div className="hidden lg:flex items-center space-x-6 flex-shrink-0">
            {/* Refer & Earn - Text Only */}
            <button
              onClick={handleReferFriend}
              className="text-sm font-medium text-gray-700 hover:text-[#FF6B35] transition-colors whitespace-nowrap"
            >
              Refer & Earn
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-[#FF6B35] to-[#FFA500] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{user.name}</span>
                  <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 z-50"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE5D9] hover:text-[#FF6B35] transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/my-orders"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE5D9] hover:text-[#FF6B35] transition-colors"
                      >
                        My Orders
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <button className="login-button text-sm font-medium text-white px-4 py-2 rounded-lg whitespace-nowrap">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button - Always visible on small devices */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain bg-white/95 backdrop-blur-lg border-t border-gray-100"
            >
              <div className="space-y-4 pt-4 px-4">
                
                {/* Platform Navigation for Mobile */}
                {platforms.map((platform) => (
                  <div key={platform.name} className="space-y-2">
                    <Link
                      to={platform.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-colors ${
                        isActive(platform.path) ? 'text-[#FF6B35] bg-orange-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <SocialPlatformIcon platform={platform.platform} size="sm" />
                      <span className="font-medium">{platform.name}</span>
                    </Link>
                    
                    {/* Platform Services */}
                    <div className="pl-8 space-y-1">
                      {platform.services.slice(0, 4).map((service) => (
                        <button
                          key={service.service}
                          onClick={() => {
                            handleServiceClick(platform.path);
                            setIsOpen(false);
                          }}
                          className="block w-full text-left py-2 text-sm text-gray-600 hover:text-[#FF6B35] hover:bg-gray-50 rounded px-2 transition-colors"
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mobile Action Buttons */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <button
                    onClick={() => {
                      handleReferFriend();
                      setIsOpen(false);
                    }}
                    className="block w-full py-3 text-center font-medium text-gray-700 hover:text-[#FF6B35] transition-colors"
                  >
                    Refer & Earn
                  </button>

                  {user ? (
                    <div className="space-y-2">
                      <Link 
                        to="/profile" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-7 h-7 bg-gradient-to-br from-[#FF6B35] to-[#FFA500] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </Link>
                      <Link 
                        to="/my-orders" 
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-left py-2 px-3 text-sm text-gray-600 hover:text-[#FF6B35] hover:bg-gray-50 rounded transition-colors"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left py-2 px-3 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <button className="login-button w-full py-3 text-sm font-medium text-white rounded-lg">
                        Login
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
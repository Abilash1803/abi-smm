import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'

const PostSelectionPage = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, selectedService, profileData } = location.state || {}
  
  const [selectedPosts, setSelectedPosts] = useState([])
  const [visiblePosts, setVisiblePosts] = useState(8) // Show only 8 posts initially

  // Mock posts data with realistic social media images
  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center', type: 'photo' },
    { id: 2, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop&crop=center', type: 'video' },
    { id: 3, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop&crop=center', type: 'photo' },
    { id: 4, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=center', type: 'carousel' },
    { id: 5, image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop&crop=center', type: 'video' },
    { id: 6, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop&crop=center', type: 'photo' },
    { id: 7, image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop&crop=center', type: 'video' },
    { id: 8, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop&crop=center', type: 'photo' },
    { id: 9, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=center', type: 'carousel' },
    { id: 10, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center', type: 'photo' },
    { id: 11, image: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=400&h=400&fit=crop&crop=center', type: 'video' },
    { id: 12, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=center', type: 'photo' }
  ]

  const handlePostToggle = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleLoadMore = () => {
    setVisiblePosts(posts.length) // Show all posts when clicked
  }

  const handleContinue = () => {
    if (selectedPosts.length === 0) {
      alert('Please select at least one post')
      return
    }

    navigate('/quantity-pricing', {
      state: {
        username,
        platform,
        selectedService,
        profileData,
        selectedPosts: posts.filter(post => selectedPosts.includes(post.id))
      }
    })
  }
  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-block bg-green-500 text-white px-3 py-2 sm:px-4 rounded-full text-sm font-medium mb-4">
            Select the posts to promote
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          
          {/* Mobile Profile Card */}
          <div className="bg-white rounded-2xl border-2 border-pink-300 p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
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
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                    {profileData?.username?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base truncate">{profileData?.username || 'abilash_bojan'}</h2>
                <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-gray-900">17</span>
                    <span className="text-gray-600 ml-1">Posts</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">706</span>
                    <span className="text-gray-600 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">656</span>
                    <span className="text-gray-600 ml-1">Following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Selected Posts Counter */}
          <div className="bg-white rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">{selectedPosts.length} Post(s) Selected</div>
              {selectedPosts.length > 0 && (
                <div className="flex gap-1 sm:gap-2">
                  {selectedPosts.slice(0, 3).map(postId => {
                    const post = posts.find(p => p.id === postId)
                    return (
                      <div key={postId} className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg overflow-hidden border-2 border-pink-400">
                        <img src={post.image} alt="Selected" className="w-full h-full object-cover" />
                      </div>
                    )
                  })}
                  {selectedPosts.length > 3 && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                      +{selectedPosts.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Mobile Posts Grid */}
          <div className="bg-white rounded-2xl p-3 sm:p-4">
            {/* Posts Grid - Responsive columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {posts.slice(0, visiblePosts).map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostToggle(post.id)}
                  className="relative cursor-pointer rounded-xl overflow-hidden aspect-square group active:scale-95 transition-transform duration-200 touch-manipulation"
                >
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                  
                  {/* Selection Overlay */}
                  <div className={`absolute inset-0 transition-all duration-200 ${
                    selectedPosts.includes(post.id) 
                      ? 'bg-pink-500/30 border-2 sm:border-4 border-pink-500' 
                      : 'active:bg-black/10'
                  }`} />
                  
                  {/* Selection Indicator */}
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
                    {selectedPosts.includes(post.id) ? (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white rounded-full bg-black/20 shadow-sm" />
                    )}
                  </div>

                  {/* Post Type Indicator */}
                  {post.type === 'video' && (
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {post.type === 'carousel' && (
                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More Button - Only show if there are more posts */}
            {visiblePosts < posts.length && (
              <div className="text-center mb-4 sm:mb-6">
                <button 
                  onClick={handleLoadMore}
                  className="text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm sm:text-base"
                >
                  LOAD MORE
                </button>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={selectedPosts.length === 0}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-lg active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONTINUE ›
            </button>
          </div>
        </div>
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6">
          
          {/* Left Sidebar - Profile Card */}
          <div className="w-80 flex-shrink-0">
            
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border-2 border-pink-300 p-6 mb-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-gray-200">
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
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                      {profileData?.username?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                  )}
                </div>
                
                <h2 className="font-bold text-gray-900 mb-4">{profileData?.username || 'abilash_bojan'}</h2>
                
                <div className="flex justify-between text-center">
                  <div>
                    <div className="font-bold text-gray-900">17</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">706</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">656</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Posts Counter */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <div className="text-sm text-gray-600 mb-2">{selectedPosts.length} Post(s) Selected</div>
              {selectedPosts.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedPosts.slice(0, 4).map(postId => {
                    const post = posts.find(p => p.id === postId)
                    return (
                      <div key={postId} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-pink-400">
                        <img src={post.image} alt="Selected" className="w-full h-full object-cover" />
                      </div>
                    )
                  })}
                  {selectedPosts.length > 4 && (
                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                      +{selectedPosts.length - 4}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Right Content - Posts Grid */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-6">
              
              {/* Posts Grid - Show only visible posts */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {posts.slice(0, visiblePosts).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostToggle(post.id)}
                    className="relative cursor-pointer rounded-xl overflow-hidden aspect-square group hover:scale-105 transition-transform duration-200"
                  >
                    <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                    
                    {/* Selection Overlay */}
                    <div className={`absolute inset-0 transition-all duration-200 ${
                      selectedPosts.includes(post.id) 
                        ? 'bg-pink-500/30 border-4 border-pink-500' 
                        : 'hover:bg-black/10'
                    }`} />
                    
                    {/* Selection Indicator */}
                    <div className="absolute top-2 right-2">
                      {selectedPosts.includes(post.id) ? (
                        <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-white rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>

                    {/* Post Type Indicator */}
                    {post.type === 'video' && (
                      <div className="absolute top-2 left-2">
                        <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    {post.type === 'carousel' && (
                      <div className="absolute top-2 left-2">
                        <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More Button - Only show if there are more posts */}
              {visiblePosts < posts.length && (
                <div className="text-center mb-6">
                  <button 
                    onClick={handleLoadMore}
                    className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    LOAD MORE
                  </button>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={selectedPosts.length === 0}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CONTINUE ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostSelectionPage
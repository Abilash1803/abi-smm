import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useScrollToTop from '../hooks/useScrollToTop'

const PostsSelection = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, selectedService, profileData } = location.state || {}
  
  const [selectedPosts, setSelectedPosts] = useState([])

  // Mock posts data with realistic social media images
  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop&crop=center', likes: '1.2K', comments: '45', views: '5.2K', type: 'photo' },
    { id: 2, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=300&fit=crop&crop=center', likes: '890', comments: '32', views: '3.1K', type: 'video' },
    { id: 3, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop&crop=center', likes: '2.1K', comments: '78', views: '8.4K', type: 'photo' },
    { id: 4, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop&crop=center', likes: '756', comments: '23', views: '2.8K', type: 'carousel' },
    { id: 5, image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop&crop=center', likes: '1.5K', comments: '56', views: '6.3K', type: 'video' },
    { id: 6, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop&crop=center', likes: '934', comments: '41', views: '4.1K', type: 'photo' },
    { id: 7, image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=300&fit=crop&crop=center', likes: '1.8K', comments: '67', views: '7.2K', type: 'video' },
    { id: 8, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=300&fit=crop&crop=center', likes: '642', comments: '19', views: '2.3K', type: 'photo' },
    { id: 9, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&crop=center', likes: '1.3K', comments: '52', views: '5.8K', type: 'carousel' }
  ]

  const platformConfig = {
    instagram: { color: 'from-pink-500 to-purple-600', name: 'Instagram', bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50' },
    youtube: { color: 'from-red-500 to-red-600', name: 'YouTube', bgColor: 'bg-gradient-to-br from-red-50 to-orange-50' },
    facebook: { color: 'from-blue-600 to-blue-700', name: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
    tiktok: { color: 'from-black to-gray-800', name: 'TikTok', bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50' }
  }

  const config = platformConfig[platform] || platformConfig.instagram

  const handlePostToggle = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
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
    <div className={`min-h-screen ${config.bgColor} py-8 px-4`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
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
                  {profileData?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">@{profileData?.username}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Service: <span className="font-semibold">{selectedService?.name}</span></span>
                <span>•</span>
                <span>Platform: <span className="font-semibold capitalize">{platform}</span></span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Selected Posts</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {selectedPosts.length}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Select Posts for <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{selectedService?.name}</span>
            </h2>
            <p className="text-gray-600">Choose which posts you want to boost with {selectedService?.name.toLowerCase()}</p>
          </div>

          {/* Select All / Deselect All */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedPosts(posts.map(p => p.id))}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedPosts([])}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Deselect All
              </button>
            </div>
            <div className="text-sm text-gray-600">
              {selectedPosts.length} of {posts.length} posts selected
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostToggle(post.id)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  selectedPosts.includes(post.id) 
                    ? 'ring-4 ring-blue-500 shadow-2xl scale-105' 
                    : 'hover:shadow-xl'
                }`}
              >
                <img src={post.image} alt="Post" className="w-full aspect-square object-cover" />
                
                {/* Selection Indicator */}
                {selectedPosts.includes(post.id) && (
                  <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Post Stats Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1">❤️ {post.likes}</span>
                    <span className="flex items-center gap-1">💬 {post.comments}</span>
                    <span className="flex items-center gap-1">👁️ {post.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={handleContinue}
              disabled={selectedPosts.length === 0}
              className={`bg-gradient-to-r ${config.color} text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              Continue with {selectedPosts.length} Post{selectedPosts.length !== 1 ? 's' : ''}
            </button>
            {selectedPosts.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">Select at least one post to continue</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostsSelection
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PlatformSearchSection from '../components/PlatformSearchSection'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'
import ApiService from '../../../shared/services/api'

const YouTubeSearchPage = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (channelName) => {
    setIsSearching(true)
    
    try {
      // Fetch real YouTube profile data
      const profileData = await ApiService.searchYoutube(channelName)
      
      // Check if we got real profile data or fallback data
      if (profileData.realProfile === false && profileData.message) {
        // Show info message about backend integration needed
        alert(`Channel found: ${profileData.channelName}\n\n${profileData.message}\n\nFor full channel details, backend YouTube API integration is required.`)
      }
      
      navigate('/profile-overview', {
        state: {
          platform: 'youtube',
          username: profileData.channelName,
          profileData: {
            ...profileData,
            // Ensure we have the required fields for the profile overview
            avatar: profileData.channelPicture,
            postsCount: profileData.videos,
            followers: profileData.subscribers,
            following: profileData.views,
            bio: profileData.description,
            verified: profileData.verified
          }
        }
      })
    } catch (error) {
      console.error('YouTube search failed:', error)
      
      // Show user-friendly error message
      alert(`YouTube Channel Not Found\n\nThe channel "${channelName}" could not be found or is not accessible.\n\nPlease check the channel name and try again.`)
      
      // Also navigate to error page for consistent UX
      navigate('/error', {
        state: {
          title: 'YouTube Channel Not Found',
          message: `We couldn't find the YouTube channel "${channelName}". Please verify the channel name is correct.`,
          platform: 'youtube',
          username: channelName,
          errorCode: 'YOUTUBE_CHANNEL_NOT_FOUND',
          canRetry: true
        }
      })
    } finally {
      setIsSearching(false)
    }
  }

  return <PlatformSearchSection platform="youtube" onSearch={handleSearch} isSearching={isSearching} />
}

export default YouTubeSearchPage

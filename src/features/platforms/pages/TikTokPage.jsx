import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PlatformSearchSection from '../components/PlatformSearchSection'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'
import ApiService from '../../../shared/services/api'

const TikTokSearchPage = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (username) => {
    setIsSearching(true)
    
    try {
      // Fetch real TikTok profile data
      const profileData = await ApiService.searchTiktok(username)
      
      // Check if we got real profile data or fallback data
      if (profileData.realProfile === false && profileData.message) {
        // Show info message about backend integration needed
        alert(`Profile found: @${profileData.username}\n\n${profileData.message}\n\nFor full profile details, backend TikTok API integration is required.`)
      }
      
      navigate('/profile-overview', {
        state: {
          platform: 'tiktok',
          username: profileData.username,
          profileData: {
            ...profileData,
            // Ensure we have the required fields for the profile overview
            avatar: profileData.profilePicture,
            postsCount: profileData.videos,
            followers: profileData.followers,
            following: profileData.following,
            bio: profileData.bio,
            verified: profileData.verified
          }
        }
      })
    } catch (error) {
      console.error('TikTok search failed:', error)
      
      // Show user-friendly error message
      alert(`TikTok Profile Not Found\n\nThe username "@${username}" could not be found or is not accessible.\n\nPlease check the username and try again.`)
      
      // Also navigate to error page for consistent UX
      navigate('/error', {
        state: {
          title: 'TikTok Profile Not Found',
          message: `We couldn't find the TikTok profile "@${username}". Please verify the username is correct and the profile is public.`,
          platform: 'tiktok',
          username,
          errorCode: 'TIKTOK_PROFILE_NOT_FOUND',
          canRetry: true
        }
      })
    } finally {
      setIsSearching(false)
    }
  }

  return <PlatformSearchSection platform="tiktok" onSearch={handleSearch} isSearching={isSearching} />
}

export default TikTokSearchPage

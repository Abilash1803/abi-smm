import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PlatformSearchSection from '../components/PlatformSearchSection'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'
import ApiService from '../../../shared/services/api'

/**
 * Instagram Search Page
 * Allows users to search for Instagram profiles and initiate orders
 * 
 * TODO: Backend Integration
 * - Connect to Instagram API for profile validation
 * - Implement real-time profile data fetching
 * - Add profile analytics and insights
 * - Handle API rate limiting and errors
 */
const InstagramPage = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const [isSearching, setIsSearching] = useState(false)

  /**
   * Handle Instagram profile search
   * @param {string} username - Instagram username to search
   * 
   * REAL INSTAGRAM INTEGRATION - Fetches actual profile data
   */
  const handleSearch = async (username) => {
    setIsSearching(true)
    
    try {
      // Fetch real Instagram profile data
      const profileData = await ApiService.searchInstagram(username)
      
      // Check if we got real profile data or fallback data
      if (profileData.realProfile === false && profileData.message) {
        // Show info message about backend integration needed
        alert(`Profile found: @${profileData.username}\n\n${profileData.message}\n\nFor full profile details, backend Instagram API integration is required.`)
      }
      
      // Navigate to profile overview with search results
      navigate('/profile-overview', {
        state: {
          platform: 'instagram',
          username: profileData.username,
          profileData: {
            ...profileData,
            // Ensure we have the required fields for the profile overview
            avatar: profileData.profilePicture,
            postsCount: profileData.posts,
            followers: profileData.followers,
            following: profileData.following,
            bio: profileData.bio,
            verified: profileData.verified,
            isPrivate: profileData.isPrivate
          }
        }
      })
    } catch (error) {
      console.error('Instagram search failed:', error)
      
      // Show user-friendly error message
      alert(`Instagram Profile Not Found\n\nThe username "@${username}" could not be found or is not accessible.\n\nPlease check the username and try again.`)
      
      // Also navigate to error page for consistent UX
      navigate('/error', {
        state: {
          title: 'Instagram Profile Not Found',
          message: `We couldn't find the Instagram profile "@${username}". Please verify the username is correct and the profile is public.`,
          platform: 'instagram',
          username,
          errorCode: 'INSTAGRAM_PROFILE_NOT_FOUND',
          canRetry: true
        }
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <PlatformSearchSection 
      platform="instagram" 
      onSearch={handleSearch} 
      isSearching={isSearching} 
    />
  )
}

export default InstagramPage

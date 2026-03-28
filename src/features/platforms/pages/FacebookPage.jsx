import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PlatformSearchSection from '../components/PlatformSearchSection'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'
import ApiService from '../../../shared/services/api'

const FacebookSearchPage = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (pageName) => {
    setIsSearching(true)
    
    try {
      // Fetch real Facebook profile data
      const profileData = await ApiService.searchFacebook(pageName)
      
      // Check if we got real profile data or fallback data
      if (profileData.realProfile === false && profileData.message) {
        // Show info message about backend integration needed
        alert(`Page found: ${profileData.pageName}\n\n${profileData.message}\n\nFor full page details, backend Facebook API integration is required.`)
      }
      
      navigate('/profile-overview', {
        state: {
          platform: 'facebook',
          username: profileData.pageName,
          profileData: {
            ...profileData,
            // Ensure we have the required fields for the profile overview
            avatar: profileData.profilePicture,
            postsCount: 'N/A', // Facebook doesn't typically show post count publicly
            followers: profileData.followers,
            following: profileData.likes,
            bio: profileData.description,
            verified: profileData.verified
          }
        }
      })
    } catch (error) {
      console.error('Facebook search failed:', error)
      
      // Show user-friendly error message
      alert(`Facebook Page Not Found\n\nThe page "${pageName}" could not be found or is not accessible.\n\nPlease check the page name and try again.`)
      
      // Also navigate to error page for consistent UX
      navigate('/error', {
        state: {
          title: 'Facebook Page Not Found',
          message: `We couldn't find the Facebook page "${pageName}". Please verify the page name is correct and the page is public.`,
          platform: 'facebook',
          username: pageName,
          errorCode: 'FACEBOOK_PAGE_NOT_FOUND',
          canRetry: true
        }
      })
    } finally {
      setIsSearching(false)
    }
  }

  return <PlatformSearchSection platform="facebook" onSearch={handleSearch} isSearching={isSearching} />
}

export default FacebookSearchPage

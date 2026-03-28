import instagramIcon from '../../assets/icons/insta.png'
import youtubeIcon from '../../assets/icons/yt.png'
import facebookIcon from '../../assets/icons/fb.png'
import tiktokIcon from '../../assets/icons/tiktok.png'

/**
 * Social Platform Icon Component
 * Displays social media platform icons with consistent sizing
 * 
 * TODO: Backend Integration
 * - Load icons dynamically from CDN
 * - Add support for new platforms
 * - Implement icon caching
 */
const SocialPlatformIcon = ({ platform, size = 'lg' }) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  const iconClass = sizeMap[size]

  const icons = {
    instagram: instagramIcon,
    youtube: youtubeIcon,
    facebook: facebookIcon,
    tiktok: tiktokIcon
  }

  const iconSrc = icons[platform]
  
  if (!iconSrc) return null

  return (
    <img 
      src={iconSrc} 
      alt={`${platform} icon`} 
      className={`${iconClass} object-contain`}
    />
  )
}

export default SocialPlatformIcon

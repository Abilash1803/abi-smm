import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import instagramIcon from '../../../shared/assets/icons/insta.png'
import youtubeIcon from '../../../shared/assets/icons/yt.png'
import facebookIcon from '../../../shared/assets/icons/fb.png'
import tiktokIcon from '../../../shared/assets/icons/tiktok.png'

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
}

export default function ServicesSection() {
  const navigate = useNavigate()

  const handlePlatformClick = (platformPath) => {
    navigate(platformPath)
  }

  const handleExploreServices = () => {
    navigate('/instagram')
  }

  const platformsData = [
    { 
      name: 'TikTok', 
      icon: tiktokIcon, 
      desc: 'Boost your TikTok presence and reach a wider audience.', 
      buttons: ['Buy TikTok followers', 'Buy TikTok likes', 'Buy TikTok views'], 
      btnClass: 'bg-black hover:bg-gray-800', 
      path: '/tiktok', 
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50'
    },
    { 
      name: 'Instagram', 
      icon: instagramIcon, 
      desc: 'Strengthen your Instagram and attract more attention.', 
      buttons: ['Buy Instagram followers', 'Buy Instagram likes', 'Buy Instagram views'], 
      btnClass: 'bg-gradient-to-r from-pink-500 to-rose-500', 
      path: '/instagram', 
      bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50'
    },
    { 
      name: 'YouTube', 
      icon: youtubeIcon, 
      desc: 'Gain more visibility and grow your subscriber base.', 
      buttons: ['Buy YouTube subscribers', 'Buy YouTube views', 'Buy YouTube likes'], 
      btnClass: 'bg-red-600 hover:bg-red-700', 
      path: '/youtube', 
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50'
    },
    { 
      name: 'Facebook', 
      icon: facebookIcon, 
      desc: 'Build a stronger Facebook presence and engagement.', 
      buttons: ['Buy Facebook followers', 'Buy Facebook likes', 'Buy Facebook views'], 
      btnClass: 'bg-blue-600 hover:bg-blue-700', 
      path: '/facebook', 
      bgColor: 'bg-gradient-to-br from-blue-50 to-pink-50'
    }
  ]

  return (
    <div className="relative overflow-hidden pb-12 sm:pb-20 bg-gradient-to-br from-purple-50/30 via-white/50 to-purple-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-20">
            <div className="mb-6 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-6 leading-tight">Start Your Growth Journey</h2>
            </div>
            <div className="bg-white/40 backdrop-blur-xl rounded-xl sm:rounded-3xl border border-white/50 p-4 sm:p-8 md:p-12 shadow-2xl">
              <h3 className="text-lg sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-6 leading-tight">Our Social Media Growth Services</h3>
              <p className="text-sm sm:text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-8">
                Increase social media engagement, visibility and credibility across multiple platforms. Enhance your social presence and get the attention your content deserves.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExploreServices} 
                className="px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white rounded-full font-semibold text-sm sm:text-lg hover:shadow-lg hover:shadow-[#FF6B35]/40 transition-all w-full sm:w-auto"
              >
                Explore Our Services
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="max-w-7xl mx-auto px-2 sm:px-6 mb-12 sm:mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8 items-start justify-items-center">
            {platformsData.map((platform, index) => (
              <motion.div 
                key={platform.name}
                variants={cardVariants}
                custom={index}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div 
                  onClick={() => handlePlatformClick(platform.path)}
                    className={`${platform.bgColor} backdrop-blur-xl rounded-[2.5rem] border-[6px] border-gray-900 
                    shadow-2xl w-full max-w-[260px] aspect-[9/16] flex flex-col relative transition-all duration-300 
                    cursor-pointer group overflow-hidden`}
                  >
                  <div className="absolute top-0.5 sm:top-2 lg:top-2 left-1/2 -translate-x-1/2 w-8 sm:w-20 lg:w-24 h-2 sm:h-7 lg:h-7 bg-gray-900 rounded-b-lg sm:rounded-b-xl lg:rounded-b-3xl flex items-center justify-center shadow-inner">
                    <div className="w-4 sm:w-10 lg:w-12 h-0.5 sm:h-0.5 lg:h-1 bg-gray-700 rounded-full"></div>
                  </div>
                  
                  <div className="flex flex-col h-full pt-8 sm:pt-10 lg:pt-14 px-4 sm:px-3 lg:px-4 bg-white/95 rounded-[1rem] sm:rounded-[2.5rem] lg:rounded-[2.7rem] shadow-inner">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 mb-3 sm:mb-4 lg:mb-6">
                      <img src={platform.icon} alt={platform.name} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 drop-shadow-sm" />
                      <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 leading-tight">{platform.name}</h4>
                    </div>
                    
                    <p className="text-xs sm:text-sm lg:text-sm text-gray-600 mb-4 sm:mb-6 lg:mb-8 leading-relaxed text-center px-1 sm:px-2 lg:px-2 font-medium">{platform.desc}</p>
                    
                    <div className="space-y-2 sm:space-y-3 lg:space-y-4 mt-auto mb-4 sm:mb-5 lg:mb-6">
                      {platform.buttons.map((btn, i) => (
                        <motion.button 
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full px-3 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-2.5 ${platform.btnClass} text-white rounded-lg sm:rounded-lg lg:rounded-xl text-xs sm:text-xs lg:text-sm font-semibold transition-all shadow-lg group-hover:shadow-xl border border-white/20`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlatformClick(platform.path)
                          }}
                        >
                          {btn}
                        </motion.button>
                      ))}
                    </div>
                    
                    <div className="flex justify-center pb-2">
                      <div className="w-32 sm:w-24 lg:w-32 h-1 sm:h-0.5 lg:h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

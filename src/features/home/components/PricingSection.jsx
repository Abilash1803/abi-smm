import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import instagramIcon from '../../../shared/assets/icons/insta.png'
import youtubeIcon from '../../../shared/assets/icons/yt.png'
import facebookIcon from '../../../shared/assets/icons/fb.png'
import tiktokIcon from '../../../shared/assets/icons/tiktok.png'

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 }
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true }
}

const platformPricing = {
  tiktok: {
    name: 'TikTok',
    icon: tiktokIcon,
    color: 'from-black to-gray-800',
    services: [
      { name: 'Likes', prices: [{ qty: '1K', price: '₹129' }, { qty: '5K', price: '₹549' }, { qty: '10K', price: '₹999' }] },
      { name: 'Followers', prices: [{ qty: '1K', price: '₹349' }, { qty: '5K', price: '₹1,499' }, { qty: '10K', price: '₹2,699' }] },
      { name: 'Views', prices: [{ qty: '1K', price: '₹19' }, { qty: '10K', price: '₹149' }, { qty: '100K', price: '₹999' }] },
      { name: 'Comments', prices: [{ qty: '100', price: '₹199' }, { qty: '500', price: '₹799' }, { qty: '1K', price: '₹1,499' }] },
    ]
  },
  instagram: {
    name: 'Instagram',
    icon: instagramIcon,
    color: 'from-pink-500 to-purple-600',
    services: [
      { name: 'Likes', prices: [{ qty: '1K', price: '₹129' }, { qty: '5K', price: '₹549' }, { qty: '10K', price: '₹999' }] },
      { name: 'Followers', prices: [{ qty: '1K', price: '₹349' }, { qty: '5K', price: '₹1,499' }, { qty: '10K', price: '₹2,699' }] },
      { name: 'Views', prices: [{ qty: '1K', price: '₹19' }, { qty: '10K', price: '₹149' }, { qty: '100K', price: '₹999' }] },
      { name: 'Comments', prices: [{ qty: '100', price: '₹249' }, { qty: '500', price: '₹999' }, { qty: '1K', price: '₹1,799' }] },
    ]
  },
  youtube: {
    name: 'YouTube',
    icon: youtubeIcon,
    color: 'from-red-600 to-red-700',
    services: [
      { name: 'Views', prices: [{ qty: '1K', price: '₹149' }, { qty: '10K', price: '₹1,199' }, { qty: '100K', price: '₹9,999' }] },
      { name: 'Subscribers', prices: [{ qty: '1K', price: '₹799' }, { qty: '5K', price: '₹3,499' }, { qty: '10K', price: '₹6,499' }] },
      { name: 'Likes', prices: [{ qty: '1K', price: '₹149' }, { qty: '5K', price: '₹599' }, { qty: '10K', price: '₹999' }] },
      { name: 'Watch Time', prices: [{ qty: '1K', price: '₹1,499' }, { qty: '5K', price: '₹6,499' }, { qty: '10K', price: '₹11,999' }] },
    ]
  },
  facebook: {
    name: 'Facebook',
    icon: facebookIcon,
    color: 'from-blue-600 to-blue-700',
    services: [
      { name: 'Page Likes', prices: [{ qty: '1K', price: '₹349' }, { qty: '5K', price: '₹1,499' }, { qty: '10K', price: '₹2,699' }] },
      { name: 'Post Likes', prices: [{ qty: '1K', price: '₹129' }, { qty: '5K', price: '₹549' }, { qty: '10K', price: '₹999' }] },
      { name: 'Video Views', prices: [{ qty: '1K', price: '₹49' }, { qty: '10K', price: '₹399' }, { qty: '100K', price: '₹2,999' }] },
      { name: 'Followers', prices: [{ qty: '1K', price: '₹599' }, { qty: '5K', price: '₹2,499' }, { qty: '10K', price: '₹4,499' }] },
    ]
  }
}

const pricingData = [
  { platform: 'TikTok', icon: tiktokIcon, color: 'from-black to-gray-800', key: 'tiktok', description: 'Likes, Followers, Views & More' },
  { platform: 'Instagram', icon: instagramIcon, color: 'from-pink-500 to-purple-600', key: 'instagram', description: 'Grow Your Instagram Presence' },
  { platform: 'YouTube', icon: youtubeIcon, color: 'from-red-600 to-red-700', key: 'youtube', description: 'Views, Subscribers & Engagement' },
  { platform: 'Facebook', icon: facebookIcon, color: 'from-blue-600 to-blue-700', key: 'facebook', description: 'Likes, Followers & Video Views' },
]

export default function PricingSection() {
  const [selectedPlatform, setSelectedPlatform] = useState(null)

  const closeModal = () => setSelectedPlatform(null)

  return (
    <div className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-purple-100/20 via-white/40 to-purple-50/30">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6">
            Pricing Plans
          </h2>
          <p className="text-base md:text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed">
            Click any platform to see our competitive pricing. Choose the package that fits your growth goals.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {pricingData.map((item, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPlatform(item.key)}
              className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/70 p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <img src={item.icon} alt={item.platform} className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                </div>
                
                <h3 className="text-base md:text-lg font-bold text-black text-center mb-1">{item.platform}</h3>
                <p className="text-xs md:text-sm text-gray-600 text-center mb-3 md:mb-4">{item.description}</p>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-gradient-to-r ${item.color} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-sm md:text-base flex items-center justify-center gap-2`}
                >
                  <span>View Pricing</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-gray-800 mb-4 md:mb-6 text-base md:text-lg">
            All plans include: 🔒 No password required • ⚡ Fast delivery • 🔄 7-day refill • 💯 Money back guarantee
          </p>
        </motion.div>

      </div>

      {/* Pricing Modal */}
      <AnimatePresence>
        {selectedPlatform && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`sticky top-0 bg-gradient-to-r ${platformPricing[selectedPlatform].color} p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <img src={platformPricing[selectedPlatform].icon} alt={platformPricing[selectedPlatform].name} className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">{platformPricing[selectedPlatform].name} Pricing</h2>
                      <p className="text-white/80 text-xs sm:text-sm">Choose your perfect package</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {platformPricing[selectedPlatform].services.map((service, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 hover:border-purple-200 transition-all"
                    >
                      <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">{service.name}</h3>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {service.prices.map((p, pIdx) => (
                          <motion.div
                            key={pIdx}
                            whileHover={{ scale: 1.02 }}
                            className="text-center p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="text-xs sm:text-sm text-gray-500 mb-1">{p.qty}</div>
                            <div className={`text-sm sm:text-lg font-bold bg-gradient-to-r ${platformPricing[selectedPlatform].color} bg-clip-text text-transparent`}>
                              {p.price}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-green-200"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-lg mb-1">🔒</span>
                      <span className="text-xs text-green-800 font-medium">No Password</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg mb-1">⚡</span>
                      <span className="text-xs text-green-800 font-medium">Fast Delivery</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg mb-1">🔄</span>
                      <span className="text-xs text-green-800 font-medium">7-Day Refill</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg mb-1">💯</span>
                      <span className="text-xs text-green-800 font-medium">Money Back</span>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeModal}
                  className={`w-full mt-4 py-3 sm:py-4 bg-gradient-to-r ${platformPricing[selectedPlatform].color} text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:shadow-xl transition-all`}
                >
                  Get Started Now 🚀
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

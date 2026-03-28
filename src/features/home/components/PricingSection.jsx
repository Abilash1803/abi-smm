import { useNavigate } from 'react-router-dom'
import instagramIcon from '../../../shared/assets/icons/insta.png'
import youtubeIcon from '../../../shared/assets/icons/yt.png'
import facebookIcon from '../../../shared/assets/icons/fb.png'
import tiktokIcon from '../../../shared/assets/icons/tiktok.png'

export default function PricingSection() {
  const navigate = useNavigate()
  
  const pricingData = [
    { platform: 'TikTok Likes', price: '2.99', icon: tiktokIcon, color: 'from-black to-gray-800', route: '/tiktok' },
    { platform: 'TikTok Followers', price: '4.99', icon: tiktokIcon, color: 'from-black to-gray-800', route: '/tiktok' },
    { platform: 'Instagram Followers', price: '3.99', icon: instagramIcon, color: 'from-purple-500 to-pink-500', route: '/instagram' },
    { platform: 'Instagram Likes', price: '2.49', icon: instagramIcon, color: 'from-purple-500 to-pink-500', route: '/instagram' },
    { platform: 'YouTube Views', price: '5.99', icon: youtubeIcon, color: 'from-red-600 to-red-700', route: '/youtube' },
    { platform: 'YouTube Subscribers', price: '7.99', icon: youtubeIcon, color: 'from-red-500 to-red-800', route: '/youtube' },
    { platform: 'Facebook Page Likes', price: '3.49', icon: facebookIcon, color: 'from-blue-600 to-blue-700', route: '/facebook' },
    { platform: 'Facebook Video Views', price: '4.49', icon: facebookIcon, color: 'from-blue-500 to-indigo-700', route: '/facebook' },
  ];

  return (
    <div className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-purple-100/20 via-white/40 to-purple-50/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6">
            Pricing Plans
          </h2>
          <p className="text-base md:text-lg text-gray-800 max-w-4xl mx-auto leading-relaxed">
            Explore some of our most popular social media growth services. Choose the platform you want to grow and discover packages designed to support different goals and budgets.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
          {pricingData.map((item, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/70 p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 hover:border-[#FF6B35]/30"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <img src={item.icon} alt={item.platform} className="w-6 h-6 md:w-8 md:h-8" />
                <h3 className="text-sm md:text-lg font-bold text-black truncate">{item.platform}</h3>
              </div>
              <div className="mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl font-bold text-black">$</span>
                <span className="text-3xl md:text-4xl font-bold text-black">{item.price}</span>
                <span className="text-gray-600 text-sm ml-1">/ package</span>
              </div>
              <button onClick={() => navigate(item.route)} className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-gradient-to-r ${item.color} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm md:text-base`}>
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-800 mb-4 md:mb-6 text-base md:text-lg">
            Explore detailed packages for each platform and choose the plan that fits your growth goals.
          </p>
        </div>

      </div>
    </div>
  );
}

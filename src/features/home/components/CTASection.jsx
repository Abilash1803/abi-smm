import { motion } from 'framer-motion'
import MagneticButton from '../../../shared/components/ui/MagneticButton'

export default function CTASection() {
  return (
    <div className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-purple-100/25 via-white/45 to-purple-50/25">
      
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#FF6B35]/20 to-[#FFB3D9]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-[#FFA500]/20 to-[#FFE5D9]/10 rounded-full blur-3xl"></div>
      
      <motion.div 
        className="max-w-5xl mx-auto relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/70 p-12 md:p-16 shadow-2xl text-center">
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Ready to Take the Spotlight on Social Media?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-800 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Every creator, brand, or business wants to stand out and be recognized. With the right push, your content can reach more people, attract attention, and build a presence that turns profiles into popular platforms.
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-800 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            At ViralKik, we help you move closer to that spotlight. Grow across TikTok, Instagram, YouTube, and Facebook with services designed to increase followers, likes, and views.
          </motion.p>
          
          <motion.p 
            className="text-base text-gray-700 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Whether you want to buy TikTok likes, buy Instagram followers, buy YouTube views, or buy Facebook page likes, the right engagement can help your profile gain momentum and recognition.
          </motion.p>
          
          <MagneticButton 
            className="px-12 py-5 bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-[#FF6B35]/50 transition-all duration-300"
            strength={30}
          >
            Step Into the Spotlight Soon
          </MagneticButton>
          
        </div>

      </motion.div>
    </div>
  );
}

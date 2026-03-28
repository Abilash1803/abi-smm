import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import PricingSection from '../components/PricingSection'
import OrderStepsSection from '../components/OrderStepsSection'
import TargetAudienceSection from '../components/TargetAudienceSection'
import WhyChooseSection from '../components/WhyChooseSection'
import CTASection from '../components/CTASection'
import FAQSection from '../components/FAQSection'
import TestimonialsSection from '../components/TestimonialsSection'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
}

const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

const slideInRight = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, ease: "easeOut" }
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-100px" }
}

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 min-h-screen">
      <HeroSection />
      
      <motion.div {...fadeInUp}>
        <ServicesSection />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <PricingSection />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <OrderStepsSection />
      </motion.div>
      
      <motion.div {...slideInLeft}>
        <TargetAudienceSection />
      </motion.div>
      
      <motion.div {...slideInRight}>
        <WhyChooseSection />
      </motion.div>
      
      <motion.div {...scaleIn}>
        <CTASection />
      </motion.div>
      
      <motion.div {...fadeInUp}>
        <FAQSection />
      </motion.div>
      
      <motion.div {...fadeIn}>
        <TestimonialsSection />
      </motion.div>
    </div>
  )
}

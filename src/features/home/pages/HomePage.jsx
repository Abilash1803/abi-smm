import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import PricingSection from '../components/PricingSection'
import OrderStepsSection from '../components/OrderStepsSection'
import TargetAudienceSection from '../components/TargetAudienceSection'
import WhyChooseSection from '../components/WhyChooseSection'
import CTASection from '../components/CTASection'
import FAQSection from '../components/FAQSection'
import TestimonialsSection from '../components/TestimonialsSection'

/**
 * Home Page Component
 * Main landing page with all marketing sections
 * Clean, organized component structure
 * 
 * TODO: Backend Integration
 * - Connect testimonials to backend API
 * - Add dynamic pricing from backend
 * - Implement analytics tracking
 * - Add A/B testing capabilities
 */
export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 min-h-screen">
      {/* Hero Section - Main call to action */}
      <HeroSection />
      
      {/* Services Overview */}
      <ServicesSection />
      
      {/* Pricing Information */}
      <PricingSection />
      
      {/* How to Order Process */}
      <OrderStepsSection />
      
      {/* Target Audience */}
      <TargetAudienceSection />
      
      {/* Why Choose Us */}
      <WhyChooseSection />
      
      {/* Call to Action */}
      <CTASection />
      
      {/* Frequently Asked Questions */}
      <FAQSection />
      
      {/* Customer Testimonials */}
      <TestimonialsSection />
    </div>
  )
}

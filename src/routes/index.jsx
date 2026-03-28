import { Routes, Route } from 'react-router-dom'

// Feature-based imports - organized by functionality
// Home Feature
import HomePage from '../features/home/pages/HomePage'
import FreeTrialPage from '../features/home/pages/FreeTrialPage'
import FreeServicePage from '../features/home/pages/FreeServicePage'

// Authentication Feature
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'

// Platform Search Feature
import InstagramPage from '../features/platforms/pages/InstagramPage'
import YouTubePage from '../features/platforms/pages/YouTubePage'
import FacebookPage from '../features/platforms/pages/FacebookPage'
import TikTokPage from '../features/platforms/pages/TikTokPage'

// User Management Feature
import ProfilePage from '../features/user/pages/ProfilePage'
import AccountSettingsPage from '../features/user/pages/AccountSettingsPage'
import ChangePasswordPage from '../features/user/pages/ChangePasswordPage'

// Company Pages
import AboutUsPage from '../features/company/pages/AboutUsPage'
import ContactPage from '../features/company/pages/ContactPage'

// Legal Pages
import PrivacyPolicyPage from '../features/legal/pages/PrivacyPolicyPage'
import TermsOfServicePage from '../features/legal/pages/TermsOfServicePage'

// Support Pages
import HelpCenterPage from '../features/support/pages/HelpCenterPage'
import FAQPage from '../features/support/pages/FAQPage'
import RefundPolicyPage from '../features/support/pages/RefundPolicyPage'
// import ContactSupportPage from '../features/support/pages/ContactSupportPage'

// Referral Feature
import ReferFriendPage from '../features/referral/pages/ReferFriendPage'

// Shared Pages
import ErrorPage from '../features/shared/pages/ErrorPage'
import SuccessPage from '../features/shared/pages/SuccessPage'

// Order Management Feature
import OrdersHistoryPage from '../features/orders/pages/OrdersHistoryPage'
import SocialProfileOverviewPage from '../features/orders/pages/SocialProfileOverviewPage'
import PostSelectionPage from '../features/orders/pages/PostSelectionPage'
import ServicePricingPage from '../features/orders/pages/ServicePricingPage'
import PaymentPage from '../features/orders/pages/PaymentPage'
import OrderProcessingPage from '../features/orders/pages/OrderProcessingPage'
import OrderCompletePage from '../features/orders/pages/OrderCompletePage'
import OrderTrackingPage from '../features/orders/pages/OrderTrackingPage'

/**
 * Application Routes Configuration
 * Organized by feature areas for better maintainability
 * 
 * TODO: Backend Integration Points
 * - Replace placeholder routes with actual backend endpoints
 * - Add authentication guards for protected routes
 * - Implement proper error handling and loading states
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      
      {/* Home & Marketing Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/free-trial" element={<FreeTrialPage />} />
      <Route path="/free-service" element={<FreeServicePage />} />
      
      {/* Company Pages */}
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Legal Pages */}
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      
      {/* Support Pages */}
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/refund" element={<RefundPolicyPage />} />
      <Route path="/refund-policy" element={<RefundPolicyPage />} />
      {/* <Route path="/support" element={<ContactSupportPage />} />
      <Route path="/contact-support" element={<ContactSupportPage />} /> */}
      
      {/* Referral Program */}
      <Route path="/refer-friend" element={<ReferFriendPage />} />
      <Route path="/referral" element={<ReferFriendPage />} />
      
      {/* Authentication Routes */}
      {/* TODO: Backend Integration - Connect to authentication API */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Platform Search Routes */}
      {/* TODO: Backend Integration - Connect to social media APIs */}
      <Route path="/instagram" element={<InstagramPage />} />
      <Route path="/youtube" element={<YouTubePage />} />
      <Route path="/facebook" element={<FacebookPage />} />
      <Route path="/tiktok" element={<TikTokPage />} />
      
      {/* ===== PROTECTED ROUTES ===== */}
      {/* TODO: Backend Integration - Add authentication guards */}
      
      {/* User Management Routes */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/account" element={<AccountSettingsPage />} />
      <Route path="/password" element={<ChangePasswordPage />} />
      
      {/* Order Management Routes */}
      <Route path="/orders" element={<OrdersHistoryPage />} />
      <Route path="/my-orders" element={<OrdersHistoryPage />} />
      
      {/* Order Flow Routes */}
      {/* TODO: Backend Integration - Connect to order processing system */}
      <Route path="/profile-overview" element={<SocialProfileOverviewPage />} />
      <Route path="/posts-selection" element={<PostSelectionPage />} />
      <Route path="/quantity-pricing" element={<ServicePricingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/processing" element={<OrderProcessingPage />} />
      <Route path="/complete" element={<OrderCompletePage />} />
      <Route path="/track" element={<OrderTrackingPage />} />
      
      {/* ===== ERROR PAGES ===== */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/success" element={<SuccessPage />} />
      
      {/* ===== FALLBACK ROUTES ===== */}
      {/* TODO: Backend Integration - Add proper 404 and error pages */}
      <Route path="*" element={<div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        {/* TODO: Replace with proper 404 component */}
      </div>} />
    </Routes>
  )
}
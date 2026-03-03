import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import TikTok from '../pages/TikTok'
import Instagram from '../pages/Instagram'
import Facebook from '../pages/Facebook'
import YouTube from '../pages/YouTube'
import SearchAccount from '../pages/SearchAccount'
import ServiceSelection from '../pages/ServiceSelection'
import PackageSelection from '../pages/PackageSelection'
import OrderPayment from '../pages/OrderPayment'
import PaymentProcessing from '../pages/PaymentProcessing'
import OrderComplete from '../pages/OrderComplete'
import TrackOrder from '../pages/TrackOrder'
import FreeTrialPage from '../pages/FreeTrialPage'
import FreeTrialService from '../pages/FreeTrialService'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import MyOrders from '../pages/MyOrders'
import ChangePassword from '../pages/ChangePassword'
import AccountProfile from '../pages/AccountProfile'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/account-profile" element={<AccountProfile />} />
      <Route path="/search" element={<SearchAccount />} />
      <Route path="/service-selection" element={<ServiceSelection />} />
      <Route path="/package-selection" element={<PackageSelection />} />
      <Route path="/order-summary" element={<OrderPayment />} />
      <Route path="/payment-processing" element={<PaymentProcessing />} />
      <Route path="/order-complete" element={<OrderComplete />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/free-trial" element={<FreeTrialPage />} />
      <Route path="/free-trial-service" element={<FreeTrialService />} />
      <Route path="/tiktok" element={<TikTok />} />
      <Route path="/instagram" element={<Instagram />} />
      <Route path="/facebook" element={<Facebook />} />
      <Route path="/youtube" element={<YouTube />} />
    </Routes>
  )
}

export default AppRoutes

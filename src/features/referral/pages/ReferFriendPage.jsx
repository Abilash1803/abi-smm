import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import Button from '../../../shared/components/ui/Button';
import { getFromStorage } from '../../../shared/utils/storage';

/**
 * Refer a Friend Page Component
 * Allows users to refer friends and earn rewards through the referral program
 * 
 * BACKEND INTEGRATION POINTS:
 * - User referral system: Generate unique referral codes and track referrals
 * - Reward system: Calculate and distribute referral bonuses
 * - Analytics: Track referral performance and conversion rates
 * - Email/SMS: Send referral invitations to friends
 * - Payment: Process referral rewards and bonuses
 */
const ReferFriendPage = () => {
  const [user, setUser] = useState(null);
  const [referralCode, setReferralCode] = useState('');
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    successfulReferrals: 0,
    totalEarnings: 0,
    pendingRewards: 0
  });
  const [friendEmail, setFriendEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // BACKEND TODO: Load user data and referral information
  useEffect(() => {
    const loggedInUser = getFromStorage('user');
    setUser(loggedInUser);
    
    if (loggedInUser) {
      // BACKEND TODO: Generate or fetch user's referral code
      // GET /api/referrals/code - Returns user's unique referral code
      setReferralCode(`VIRAL${loggedInUser.id || 'DEMO'}${Math.random().toString(36).substr(2, 4).toUpperCase()}`);
      
      // BACKEND TODO: Fetch referral statistics
      // GET /api/referrals/stats - Returns referral performance data
      setReferralStats({
        totalReferrals: 12,
        successfulReferrals: 8,
        totalEarnings: 240.50,
        pendingRewards: 45.00
      });
    }
  }, []);

  // BACKEND TODO: Send referral invitation
  const handleSendInvitation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // BACKEND TODO: Send referral invitation email
      // POST /api/referrals/invite
      // Body: { email: friendEmail, referralCode: referralCode }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage('Invitation sent successfully! Your friend will receive an email with your referral link.');
      setFriendEmail('');
    } catch (error) {
      setMessage('Failed to send invitation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy referral link to clipboard
  const handleCopyLink = () => {
    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setMessage('Referral link copied to clipboard!');
    setTimeout(() => setMessage(''), 3000);
  };

  // Share on social media
  const handleSocialShare = (platform) => {
    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;
    const shareText = `Join ViralKik and get amazing social media growth services! Use my referral code: ${referralCode}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + referralLink)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#8B5CF6] to-[#E0E7FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
            👥
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access the referral program and start earning rewards.
          </p>
          <div className="space-y-3">
            <Link to="/login">
              <Button fullWidth>Login to Continue</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" fullWidth>Create Account</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#8B5CF6] to-[#E0E7FF] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl">
            👥
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refer Friends & Earn Rewards
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share ViralKik with your friends and earn <span className="font-bold text-[#8B5CF6]">$15</span> for every successful referral. 
            Your friends get <span className="font-bold text-[#8B5CF6]">20% off</span> their first order!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Referral Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Referral Stats</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                <div className="text-3xl font-bold text-blue-600 mb-2">{referralStats.totalReferrals}</div>
                <div className="text-sm text-blue-700 font-medium">Total Referrals</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50">
                <div className="text-3xl font-bold text-green-600 mb-2">{referralStats.successfulReferrals}</div>
                <div className="text-sm text-green-700 font-medium">Successful</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200/50">
                <div className="text-3xl font-bold text-purple-600 mb-2">${referralStats.totalEarnings}</div>
                <div className="text-sm text-purple-700 font-medium">Total Earned</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200/50">
                <div className="text-3xl font-bold text-indigo-600 mb-2">${referralStats.pendingRewards}</div>
                <div className="text-sm text-indigo-700 font-medium">Pending</div>
              </div>
            </div>
          </motion.div>

          {/* Referral Code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Referral Code</h2>
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#E0E7FF] rounded-xl p-6 text-center mb-6 shadow-lg">
              <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{referralCode}</div>
              <div className="text-purple-100">Share this code with friends</div>
            </div>
            <Button 
              onClick={handleCopyLink}
              fullWidth
              className="mb-4"
            >
              📋 Copy Referral Link
            </Button>
            <div className="text-sm text-gray-600 text-center">
              Friends who sign up with your code get 20% off their first order
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Send Invitation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Invite a Friend</h2>
            <form onSubmit={handleSendInvitation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Friend's Email Address
                </label>
                <input
                  type="email"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  placeholder="friend@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent backdrop-blur-sm bg-white/50"
                  required
                />
              </div>
              <Button 
                type="submit" 
                fullWidth 
                disabled={isLoading}
                className="relative"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  '📧 Send Invitation'
                )}
              </Button>
            </form>
            
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg text-sm ${
                  message.includes('successfully') 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}
              >
                {message}
              </motion.div>
            )}
          </motion.div>

          {/* Social Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Share on Social Media</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleSocialShare('facebook')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <span className="text-xl">📘</span>
                Share on Facebook
              </button>
              <button
                onClick={() => handleSocialShare('twitter')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <span className="text-xl">🐦</span>
                Share on Twitter
              </button>
              <button
                onClick={() => handleSocialShare('whatsapp')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <span className="text-xl">💬</span>
                Share on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 mt-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#E0E7FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Share Your Code</h3>
              <p className="text-gray-600">
                Share your unique referral code with friends via email, social media, or direct link.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#E0E7FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Friend Signs Up</h3>
              <p className="text-gray-600">
                Your friend creates an account using your referral code and gets 20% off their first order.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#E0E7FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">You Earn Rewards</h3>
              <p className="text-gray-600">
                When your friend makes their first purchase, you earn $15 in your account balance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferFriendPage;
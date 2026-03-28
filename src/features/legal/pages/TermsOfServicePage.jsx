import useScrollToTop from '../../../shared/hooks/useScrollToTop'

/**
 * Terms of Service Page
 * Legal terms and conditions for using the service
 */
const TermsOfServicePage = () => {
  useScrollToTop()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Social Media Boost ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Social Media Boost provides social media marketing services including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Social media followers, likes, views, and engagement services</li>
              <li>Content promotion and visibility enhancement</li>
              <li>Social media growth and marketing solutions</li>
              <li>Analytics and performance tracking tools</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using our services, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide accurate and complete information when creating an account</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use our services in compliance with all applicable laws and regulations</li>
              <li>Not engage in fraudulent, abusive, or harmful activities</li>
              <li>Respect the terms of service of third-party social media platforms</li>
              <li>Not attempt to reverse engineer or compromise our systems</li>
            </ul>
          </section>

          {/* Prohibited Uses */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Uses</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not use our services for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Illegal activities or content that violates any laws</li>
              <li>Harassment, bullying, or harmful behavior toward others</li>
              <li>Spam, phishing, or other deceptive practices</li>
              <li>Promoting hate speech, violence, or discrimination</li>
              <li>Infringing on intellectual property rights</li>
              <li>Distributing malware or harmful software</li>
              <li>Attempting to manipulate or game social media algorithms in ways that violate platform policies</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment and Billing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment terms for our services:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All payments must be made in advance before service delivery</li>
              <li>We accept major credit cards, PayPal, and other approved payment methods</li>
              <li>Prices are subject to change with reasonable notice</li>
              <li>All sales are final unless otherwise specified in our refund policy</li>
              <li>You are responsible for any applicable taxes</li>
              <li>Failed payments may result in service suspension</li>
            </ul>
          </section>

          {/* Service Delivery */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Delivery and Guarantees</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Regarding service delivery:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We strive to deliver services within the specified timeframes</li>
              <li>Delivery times may vary based on order size and platform requirements</li>
              <li>We provide quality assurance for all delivered services</li>
              <li>Some fluctuation in delivered quantities is normal and expected</li>
              <li>We offer customer support throughout the delivery process</li>
              <li>Refill guarantees apply to eligible services as specified</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              The Service and its original content, features, and functionality are and will remain the exclusive property of Social Media Boost and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection, use, and disclosure of your personal information.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Limitations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Important disclaimers:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Services are provided "as is" without warranties of any kind</li>
              <li>We do not guarantee specific results or outcomes</li>
              <li>Social media platforms may change their policies, affecting our services</li>
              <li>We are not responsible for actions taken by third-party platforms</li>
              <li>Results may vary based on numerous factors beyond our control</li>
              <li>We disclaim liability for indirect, incidental, or consequential damages</li>
            </ul>
          </section>

          {/* Account Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which Social Media Boost operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700"><strong>Email:</strong> legal@socialmediaboost.com</p>
              <p className="text-gray-700"><strong>Address:</strong> 123 Digital Avenue, Tech City, TC 12345</p>
              <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfServicePage
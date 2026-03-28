import useScrollToTop from '../../../shared/hooks/useScrollToTop'

/**
 * Refund Policy Page
 * Detailed refund policy and procedures
 */
const RefundPolicyPage = () => {
  useScrollToTop()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Policy Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              At Social Media Boost, we are committed to providing high-quality services and ensuring customer satisfaction. This refund policy outlines the circumstances under which refunds may be issued and the procedures for requesting them.
            </p>
          </section>

          {/* Refund Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Eligibility</h2>
            
            <div className="bg-green-50 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-green-800 mb-3">✅ You ARE eligible for a refund if:</h3>
              <ul className="list-disc list-inside text-green-700 space-y-2">
                <li>We fail to deliver your order within the specified timeframe</li>
                <li>The delivered service does not meet our quality standards</li>
                <li>You experience technical issues that prevent service delivery</li>
                <li>Your order was processed incorrectly due to our error</li>
                <li>You cancel your order within 1 hour of placement (before processing begins)</li>
                <li>We determine that your order cannot be completed for technical reasons</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-red-800 mb-3">❌ You are NOT eligible for a refund if:</h3>
              <ul className="list-disc list-inside text-red-700 space-y-2">
                <li>Your order has been successfully delivered as described</li>
                <li>You change your mind after the order has started processing</li>
                <li>You provide incorrect profile information or URLs</li>
                <li>Your social media account is deleted, suspended, or made private after order placement</li>
                <li>You experience natural fluctuations in followers/engagement after delivery</li>
                <li>Third-party platform changes affect the delivered service</li>
                <li>You violate the terms of service of the social media platform</li>
              </ul>
            </div>
          </section>

          {/* Refund Types */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Refunds</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Full Refund</h3>
                <p className="text-blue-700 mb-3">100% of the order amount returned</p>
                <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                  <li>Order not delivered within timeframe</li>
                  <li>Technical issues prevent delivery</li>
                  <li>Order cancelled within 1 hour</li>
                  <li>Service error on our part</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Partial Refund</h3>
                <p className="text-purple-700 mb-3">Percentage based on undelivered portion</p>
                <ul className="list-disc list-inside text-purple-700 space-y-1 text-sm">
                  <li>Order partially completed</li>
                  <li>Quality issues with portion of delivery</li>
                  <li>Service interruption during delivery</li>
                  <li>Account issues affecting completion</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Step-by-Step Process:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Contact Support</h4>
                    <p className="text-gray-700 text-sm">Email us at support@socialmediaboost.com or use our contact form</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Provide Order Details</h4>
                    <p className="text-gray-700 text-sm">Include your order number, email address, and reason for refund request</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Review Process</h4>
                    <p className="text-gray-700 text-sm">Our team will review your request within 24-48 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Refund Processing</h4>
                    <p className="text-gray-700 text-sm">If approved, refunds are processed within 3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Processing Times */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing Times</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-50 rounded-2xl overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Payment Method</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Processing Time</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Credit/Debit Card</td>
                    <td className="px-6 py-4 text-gray-700">3-5 business days</td>
                    <td className="px-6 py-4 text-gray-700">May take up to 10 days depending on bank</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">PayPal</td>
                    <td className="px-6 py-4 text-gray-700">1-2 business days</td>
                    <td className="px-6 py-4 text-gray-700">Fastest refund method</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Cryptocurrency</td>
                    <td className="px-6 py-4 text-gray-700">24-48 hours</td>
                    <td className="px-6 py-4 text-gray-700">Subject to network confirmation times</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Bank Transfer</td>
                    <td className="px-6 py-4 text-gray-700">5-7 business days</td>
                    <td className="px-6 py-4 text-gray-700">International transfers may take longer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Quality Guarantee */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quality Guarantee & Refills</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In addition to our refund policy, we offer quality guarantees on most services:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li><strong>30-Day Refill Guarantee:</strong> If you experience drops within 30 days, we'll refill for free</li>
              <li><strong>Lifetime Refill:</strong> Available on select premium services</li>
              <li><strong>Quality Assurance:</strong> All delivered engagement comes from real, active accounts</li>
              <li><strong>Gradual Delivery:</strong> Natural delivery patterns to ensure account safety</li>
            </ul>
            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-blue-800 font-medium">
                💡 Tip: Refills are often a better solution than refunds for temporary drops in engagement or followers.
              </p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you're not satisfied with our refund decision, we offer a dispute resolution process:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Submit a formal dispute within 30 days of the refund decision</li>
              <li>Provide additional evidence or documentation supporting your case</li>
              <li>Our senior management team will review the dispute within 5-7 business days</li>
              <li>You'll receive a final decision with detailed explanation</li>
              <li>If still unsatisfied, you may pursue resolution through your payment provider</li>
            </ol>
          </section>

          {/* Important Notes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notes</h2>
            <div className="bg-yellow-50 rounded-2xl p-6">
              <ul className="list-disc list-inside text-yellow-800 space-y-2">
                <li>Refund requests must be submitted within 30 days of order completion</li>
                <li>Only one refund request per order is allowed</li>
                <li>Refunds are processed in the original payment currency</li>
                <li>Processing fees may be deducted from refund amounts</li>
                <li>Fraudulent refund requests may result in account suspension</li>
                <li>This policy may be updated periodically with notice to customers</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us for Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To request a refund or ask questions about our refund policy:
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700"><strong>Email:</strong> refunds@socialmediaboost.com</p>
              <p className="text-gray-700"><strong>Support:</strong> support@socialmediaboost.com</p>
              <p className="text-gray-700"><strong>Live Chat:</strong> Available 24/7 on our website</p>
              <p className="text-gray-700"><strong>Response Time:</strong> Within 24 hours</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RefundPolicyPage
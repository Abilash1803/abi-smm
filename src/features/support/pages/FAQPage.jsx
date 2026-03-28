import { useState } from 'react'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'

/**
 * FAQ Page
 * Frequently Asked Questions with expandable answers
 */
const FAQPage = () => {
  useScrollToTop()
  
  const [openFAQ, setOpenFAQ] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: '❓',
      faqs: [
        {
          id: 1,
          question: 'What is Social Media Boost?',
          answer: 'Social Media Boost is a professional social media marketing service that helps individuals, influencers, and businesses grow their social media presence through authentic engagement, followers, likes, views, and other social media metrics across platforms like Instagram, YouTube, Facebook, and TikTok.'
        },
        {
          id: 2,
          question: 'Is it safe to use your services?',
          answer: 'Yes, our services are completely safe. We use organic methods and real accounts to deliver engagement. We never ask for your password and all our processes comply with social media platform guidelines. Your account security is our top priority.'
        },
        {
          id: 3,
          question: 'How quickly will I see results?',
          answer: 'Delivery times vary depending on the service and order size. Most orders begin processing within 1-6 hours and are completed within 24-72 hours. Larger orders may take longer to ensure quality and natural delivery patterns.'
        }
      ]
    },
    {
      id: 'orders',
      title: 'Orders & Delivery',
      icon: '📦',
      faqs: [
        {
          id: 4,
          question: 'How do I place an order?',
          answer: 'Placing an order is simple: 1) Choose your platform (Instagram, YouTube, etc.), 2) Enter your username/profile URL, 3) Select the service you want (followers, likes, etc.), 4) Choose your quantity, 5) Complete payment. Your order will start processing automatically.'
        },
        {
          id: 5,
          question: 'Can I track my order progress?',
          answer: 'Yes! Once you place an order, you can track its progress in your account dashboard. You\'ll see the current status, delivery progress, and estimated completion time. We also send email updates for major order milestones.'
        },
        {
          id: 6,
          question: 'What if my order is not delivered?',
          answer: 'If your order is not delivered within the specified timeframe, please contact our support team. We offer a delivery guarantee and will either complete your order or provide a full refund. Most delivery issues are resolved within 24 hours.'
        }
      ]
    },
    {
      id: 'payment',
      title: 'Payment & Billing',
      icon: '💳',
      faqs: [
        {
          id: 7,
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and various cryptocurrencies. All payments are processed securely through encrypted payment gateways.'
        },
        {
          id: 8,
          question: 'Is my payment information secure?',
          answer: 'Absolutely. We use industry-standard SSL encryption and work with PCI-compliant payment processors. We never store your payment information on our servers. All transactions are processed through secure, encrypted connections.'
        },
        {
          id: 9,
          question: 'Do you offer refunds?',
          answer: 'Yes, we offer refunds in certain circumstances. If we cannot deliver your order as promised, you\'re eligible for a full refund. Partial refunds may be available for partially completed orders. Please see our refund policy for complete details.'
        }
      ]
    },
    {
      id: 'quality',
      title: 'Quality & Guarantees',
      icon: '⭐',
      faqs: [
        {
          id: 10,
          question: 'Are your followers/likes real?',
          answer: 'Yes, we provide real, active followers and engagement from genuine accounts. We do not use bots or fake accounts. All our services come from real people who are interested in your content, ensuring authentic and lasting engagement.'
        },
        {
          id: 11,
          question: 'Do you offer a quality guarantee?',
          answer: 'Yes, we offer a 30-day quality guarantee on most services. If you experience significant drops in followers or engagement within 30 days, we\'ll provide free refills to restore your numbers. Some services include lifetime refill guarantees.'
        },
        {
          id: 12,
          question: 'Will my account get banned?',
          answer: 'No, our services are designed to be completely safe and compliant with platform guidelines. We use gradual, natural delivery methods that mimic organic growth. We\'ve never had a client\'s account banned due to our services.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: '🔧',
      faqs: [
        {
          id: 13,
          question: 'My profile is private, can you still deliver?',
          answer: 'For most services, your profile needs to be public during delivery. You can make it private again after delivery is complete. Some services like followers can be delivered to private accounts, but engagement services require public profiles.'
        },
        {
          id: 14,
          question: 'I changed my username, what happens to my order?',
          answer: 'If you change your username after placing an order, please contact our support team immediately with your new username. We can usually redirect the order to your new profile if notified within 24 hours of the change.'
        },
        {
          id: 15,
          question: 'Can I cancel or modify my order?',
          answer: 'Orders can be cancelled or modified within the first hour of placement, before processing begins. Once delivery starts, orders cannot be cancelled, but you can contact support for assistance with any issues or concerns.'
        }
      ]
    }
  ]

  const allFAQs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.title }))
  )

  const filteredFAQs = searchQuery 
    ? allFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find quick answers to the most common questions about our services.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQ..."
                className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {filteredFAQs ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results ({filteredFAQs.length} found)
            </h2>
            {filteredFAQs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012 2v1.306z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try different keywords or browse categories below.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map(faq => (
                  <div key={faq.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="text-sm text-purple-600 font-medium">{faq.category}</span>
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transition-transform ${openFAQ === faq.id ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFAQ === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* FAQ Categories */
          <div className="space-y-8">
            {faqCategories.map(category => (
              <div key={category.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    {category.title}
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {category.faqs.map(faq => (
                    <div key={faq.id}>
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        <svg 
                          className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openFAQ === faq.id ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFAQ === faq.id && (
                        <div className="px-6 pb-4 bg-gray-50">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-purple-100 mb-6">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="/help-center" 
              className="bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition-colors"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
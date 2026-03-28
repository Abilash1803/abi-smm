import { useState } from 'react'
import useScrollToTop from '../../../shared/hooks/useScrollToTop'

/**
 * Help Center Page
 * Comprehensive help center with search and categories
 */
const HelpCenterPage = () => {
  useScrollToTop()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'orders', name: 'Orders & Delivery', icon: '📦' },
    { id: 'payment', name: 'Payment & Billing', icon: '💳' },
    { id: 'account', name: 'Account Management', icon: '👤' },
    { id: 'technical', name: 'Technical Issues', icon: '🔧' },
    { id: 'policies', name: 'Policies & Guidelines', icon: '📋' }
  ]

  const helpArticles = [
    {
      id: 1,
      title: 'How to place your first order',
      category: 'getting-started',
      description: 'Step-by-step guide to placing your first social media boost order',
      readTime: '3 min read',
      popular: true
    },
    {
      id: 2,
      title: 'Understanding delivery times',
      category: 'orders',
      description: 'Learn about our delivery timeframes and what to expect',
      readTime: '2 min read',
      popular: true
    },
    {
      id: 3,
      title: 'Payment methods and security',
      category: 'payment',
      description: 'Information about accepted payment methods and security measures',
      readTime: '4 min read',
      popular: false
    },
    {
      id: 4,
      title: 'How to track your order status',
      category: 'orders',
      description: 'Monitor your order progress and delivery status',
      readTime: '2 min read',
      popular: true
    },
    {
      id: 5,
      title: 'Account security best practices',
      category: 'account',
      description: 'Keep your account safe with these security tips',
      readTime: '5 min read',
      popular: false
    },
    {
      id: 6,
      title: 'Refund and cancellation policy',
      category: 'policies',
      description: 'Understanding our refund process and cancellation terms',
      readTime: '3 min read',
      popular: true
    },
    {
      id: 7,
      title: 'Troubleshooting common issues',
      category: 'technical',
      description: 'Solutions to frequently encountered technical problems',
      readTime: '6 min read',
      popular: false
    },
    {
      id: 8,
      title: 'Quality guarantee and refills',
      category: 'orders',
      description: 'Learn about our quality standards and refill policies',
      readTime: '3 min read',
      popular: true
    }
  ]

  const filteredArticles = helpArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularArticles = helpArticles.filter(article => article.popular)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to your questions and get the help you need to make the most of our services.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Get instant help from our support team</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Chat
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us a detailed message</p>
            <a href="/contact" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block">
              Contact Us
            </a>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">FAQ</h3>
            <p className="text-gray-600 mb-4">Quick answers to common questions</p>
            <a href="/faq" className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors inline-block">
              View FAQ
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles Content */}
          <div className="lg:col-span-3">
            
            {/* Popular Articles */}
            {selectedCategory === 'all' && searchQuery === '' && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {popularArticles.map(article => (
                    <div key={article.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                          Popular
                        </span>
                        <span className="text-gray-500 text-sm">{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-gray-600">{article.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
                {searchQuery && ` - Search results for "${searchQuery}"`}
              </h2>
              
              {filteredArticles.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012 2v1.306z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search or browse different categories.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredArticles.map(article => (
                    <div key={article.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              {categories.find(c => c.id === article.category)?.name}
                            </span>
                            {article.popular && (
                              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                Popular
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                          <p className="text-gray-600 mb-3">{article.description}</p>
                          <span className="text-gray-500 text-sm">{article.readTime}</span>
                        </div>
                        <svg className="w-6 h-6 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenterPage
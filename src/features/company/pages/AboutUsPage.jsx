import useScrollToTop from '../../../shared/hooks/useScrollToTop'

/**
 * About Us Page
 * Information about the company, mission, and team
 */
const AboutUsPage = () => {
  useScrollToTop()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're passionate about helping creators and businesses grow their social media presence with authentic, high-quality engagement.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            At Social Media Boost, we believe that every creator, influencer, and business deserves the opportunity to reach their full potential on social media. Our mission is to provide safe, reliable, and effective social media growth services that help our clients build authentic engagement and expand their digital presence.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We're committed to delivering real results while maintaining the highest standards of quality and customer service. Our team works tirelessly to ensure that every interaction, every follower, and every engagement we provide contributes to genuine growth and success.
          </p>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">We never compromise on quality. Every service we provide meets our strict standards for authenticity and effectiveness.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Security & Privacy</h3>
              <p className="text-gray-600">Your privacy and account security are our top priorities. We use industry-leading security measures to protect your information.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">We understand that timing matters in social media. Our services are delivered quickly without sacrificing quality.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated support team is available around the clock to help you with any questions or concerns.</p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Founded in 2020, Social Media Boost started as a small team of social media enthusiasts who recognized the challenges that creators and businesses face in building their online presence. We saw how difficult it could be to gain traction in an increasingly crowded digital landscape.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            What began as a passion project has grown into a trusted platform serving thousands of clients worldwide. We've helped influencers reach their first million followers, assisted small businesses in building their brand awareness, and supported content creators in monetizing their passion.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Today, we continue to innovate and expand our services, always keeping our clients' success at the heart of everything we do. We're not just a service provider – we're your partners in social media growth.
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Orders Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
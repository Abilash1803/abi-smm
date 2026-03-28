import { Link } from 'react-router-dom'
import tiktokIcon from '../../assets/icons/tiktok.png'
import instagramIcon from '../../assets/icons/insta.png'
import facebookIcon from '../../assets/icons/fb.png'
import youtubeIcon from '../../assets/icons/yt.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Services: [
      { name: 'TikTok Growth', path: '/tiktok', icon: tiktokIcon, isImage: true },
      { name: 'Instagram Boost', path: '/instagram', icon: instagramIcon, isImage: true },
      { name: 'Facebook Likes', path: '/facebook', icon: facebookIcon, isImage: true },
      { name: 'YouTube Views', path: '/youtube', icon: youtubeIcon, isImage: true }
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' }
    ],
    Support: [
      { name: 'Help Center', path: '/help' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Refund Policy', path: '/refund' },
      { name: 'Contact Support', path: '/contact' }
    ]
  }

  const socialLinks = [
    { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84', label: 'Twitter', isImage: false },
    { name: 'Instagram', icon: instagramIcon, label: 'Instagram', isImage: true },
    { name: 'Facebook', icon: facebookIcon, label: 'Facebook', isImage: true },
  ]

  return (
    <>
      <style>{`
        .viralkik-logo-footer {
          background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 50%, #E0E7FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 
            0 1px 0 rgba(139, 92, 246, 0.8),
            0 2px 0 rgba(139, 92, 246, 0.6),
            0 3px 0 rgba(139, 92, 246, 0.4),
            0 4px 0 rgba(139, 92, 246, 0.2),
            0 6px 15px rgba(139, 92, 246, 0.3);
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
        }
        .viralkik-logo-footer::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -6px;
          right: -6px;
          bottom: -3px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.1));
          border-radius: 10px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .viralkik-logo-footer:hover::before {
          opacity: 1;
        }
        .viralkik-logo-footer:hover {
          transform: translateY(-1px);
          text-shadow: 
            0 2px 0 rgba(139, 92, 246, 0.8),
            0 4px 0 rgba(139, 92, 246, 0.6),
            0 6px 0 rgba(139, 92, 246, 0.4),
            0 8px 0 rgba(139, 92, 246, 0.2),
            0 12px 25px rgba(139, 92, 246, 0.4);
        }
      `}</style>
      <footer className="bg-gradient-to-b from-[#FFD9E8] to-[#FFF5E6] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <div className="relative">
                <span className="viralkik-logo-footer text-3xl font-bold">
                  ViralKik
                </span>
              </div>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              Your trusted partner for social media growth. Safe, secure, and effective services to boost your online presence.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center text-gray-600 hover:bg-[#FF6B35] hover:text-white transition-all hover:scale-110 shadow-md"
                  aria-label={social.label || social.name}
                >
                  {social.isImage ? (
                    <img 
                      src={social.icon} 
                      alt={social.label || social.name} 
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-[#FF6B35] mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-[#FF6B35] transition-colors flex items-center gap-2"
                    >
                      {link.icon && (
                        link.isImage ? (
                          <img src={link.icon} alt={link.name} className="w-4 h-4 object-contain" />
                        ) : (
                          <span>{link.icon}</span>
                        )
                      )}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} ViralKik. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-[#FF6B35] transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-[#FF6B35] transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-[#FF6B35] transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer

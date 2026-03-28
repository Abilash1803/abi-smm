export default function HowToOrder() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Platform',
      icon: '🎯',
      description: 'Select TikTok, Instagram, YouTube, or Facebook',
      gradient: 'from-[#FF6B35] to-[#FFA500]'
    },
    {
      number: '02',
      title: 'Select Your Service',
      icon: '✨',
      description: 'Pick followers, likes, views, or engagement',
      gradient: 'from-[#FFA500] to-[#FFB3D9]'
    },
    {
      number: '03',
      title: 'Enter Your Details',
      icon: '📝',
      description: 'Provide your profile link and quantity',
      gradient: 'from-[#FFB3D9] to-[#FF6B9D]'
    },
    {
      number: '04',
      title: 'Complete Order',
      icon: '✅',
      description: 'Checkout and start processing',
      gradient: 'from-[#FF6B9D] to-[#8B5CF6]'
    }
  ]

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-purple-50/25 via-white/45 to-purple-100/25">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6">
            How to Place an Order
          </h2>
          <p className="text-base sm:text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed px-4">
            Getting started is quick and simple. Just follow these steps to boost your social media engagement.
          </p>
        </div>

        <div className="lg:hidden">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-1 h-8 bg-gradient-to-b from-gray-300 to-gray-200 rounded-full">
                    <div 
                      className="absolute w-6 h-6 flex items-center justify-center text-red-500 text-xl z-50"
                      style={{
                        left: '-10px',
                        animation: `simpleHeartFlow 2s linear infinite`,
                        animationDelay: `${index * 0.5}s`
                      }}
                    >
                      ❤️
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-6 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.number}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{step.icon}</span>
                      <h3 className="text-xl font-bold text-black">{step.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 border-l-2 border-dotted border-gray-400 transform -translate-x-1/2">
            <div 
              className="absolute w-8 h-8 flex items-center justify-center text-2xl z-50"
              style={{
                left: '-16px',
                animation: 'simpleHeartFlowDesktop 4s linear infinite'
              }}
            >
              ❤️
            </div>
            
            <div 
              className="absolute w-8 h-8 flex items-center justify-center text-2xl z-50"
              style={{
                left: '-16px',
                animation: 'simpleHeartFlowDesktop 4s linear infinite',
                animationDelay: '2s'
              }}
            >
              ❤️
            </div>
          </div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-row items-center justify-center gap-8">
                <div className="w-1/2 pr-16">
                  {index % 2 === 0 ? (
                    <div className={`bg-gradient-to-r ${step.gradient} rounded-full px-8 py-4 inline-flex items-center gap-4 shadow-2xl hover:scale-105 transition-all duration-300 ml-auto`}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="text-sm opacity-90">{step.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-gray-300 text-right">
                      STEP
                    </div>
                  )}
                </div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl`}>
                    {step.number}
                  </div>
                </div>
                
                <div className="w-1/2 pl-16">
                  {index % 2 === 1 ? (
                    <div className={`bg-gradient-to-r ${step.gradient} rounded-full px-8 py-4 inline-flex items-center gap-4 shadow-2xl hover:scale-105 transition-all duration-300`}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="text-sm opacity-90">{step.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-gray-300 text-left">
                      STEP
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-20 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 p-6 sm:p-8 shadow-lg max-w-4xl mx-auto">
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
            Once confirmed, your selected engagement will start appearing on your profile or content.
          </p>
        </div>

      </div>
      
      <style jsx>{`
        @keyframes simpleHeartFlow {
          0% {
            top: -10px;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            top: 40px;
            opacity: 0;
          }
        }
        
        @keyframes simpleHeartFlowDesktop {
          0% {
            top: -20px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

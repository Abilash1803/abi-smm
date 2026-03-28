import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters long'); return }
    setIsLoading(true);
    setError('');
    setTimeout(() => { setIsLoading(false); navigate('/login'); }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join ViralKik and start growing today</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-sm text-red-600">{error}</p></div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#8B5CF6] focus:outline-none transition-colors bg-white" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#8B5CF6] focus:outline-none transition-colors bg-white" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#8B5CF6] focus:outline-none transition-colors bg-white" placeholder="••••••••" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required minLength={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#8B5CF6] focus:outline-none transition-colors bg-white" placeholder="••••••••" />
            </div>
            <Button type="submit" fullWidth size="lg" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#8B5CF6] hover:text-[#7C3AED] font-semibold">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

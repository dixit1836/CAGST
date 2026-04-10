import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const Login = ({ setIsAuthenticated }) => {
  const [isOTP, setIsOTP] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (isSignup && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!isOTP && !isSignup) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    if (isOTP && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (isOTP && formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setIsAuthenticated(true);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-dark-bg dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="card w-full max-w-md p-8 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg shadow-primary-600/30">
            G
          </div>
          <h2 className="text-2xl font-bold mb-2">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {isSignup 
              ? 'Start your 14-day free trial. No credit card required.' 
              : 'Log in to manage your GST filings'}
          </p>
        </div>

        {/* Login Mode Toggle */}
        {!isSignup && (
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-6">
            <button 
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${!isOTP 
                ? 'bg-white dark:bg-dark-card shadow text-slate-800 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              onClick={() => { setIsOTP(false); setErrors({}); }}
            >
              Email & Password
            </button>
            <button 
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${isOTP 
                ? 'bg-white dark:bg-dark-card shadow text-slate-800 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              onClick={() => { setIsOTP(true); setErrors({}); }}
            >
              Mobile OTP
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (Signup only) */}
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`} 
                  placeholder="Rahul Kumar"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.name}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          {!isOTP && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`} 
                  placeholder="rahul@sellerstore.in"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>
          )}

          {/* Password */}
          {!isOTP && !isSignup && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs text-primary-600 hover:underline font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`} 
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.password}
                </p>
              )}
            </div>
          )}

          {/* OTP Mode */}
          {isOTP && !isSignup && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Mobile Number</label>
              <div className="flex gap-2">
                <select className="input-field w-20 text-center">
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <div className="relative flex-1">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`} 
                    placeholder="9876543210"
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.phone}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full flex justify-center items-center gap-2 py-3 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isOTP ? 'Sending OTP...' : 'Signing in...'}
              </>
            ) : (
              <>
                {isSignup ? 'Create Account' : isOTP ? 'Send OTP' : 'Sign In'} 
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        {/* Sign up toggle */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          {isSignup ? 'Already have an account?' : "Don't have an account?"} 
          <button 
            onClick={() => {
              setIsSignup(!isSignup);
              setIsOTP(false);
              setErrors({});
              setFormData({ name: '', email: '', password: '', phone: '' });
            }} 
            className="text-primary-600 font-bold hover:underline ml-1"
          >
            {isSignup ? 'Sign in' : 'Sign up free'}
          </button>
        </p>

        {/* Features list (signup only) */}
        {isSignup && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Free trial includes:</p>
            <ul className="space-y-2">
              {['14-day free trial', 'Unlimited report uploads', 'All marketplace integrations', 'Priority support'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle size={14} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

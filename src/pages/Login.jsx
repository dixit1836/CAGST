import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

const Login = ({ setIsAuthenticated }) => {
  const [isOTP, setIsOTP] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg flex items-center justify-center p-6">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="card w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg shadow-primary-600/30">
            G
          </div>
          <h2 className="text-3xl font-bold mb-2">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-slate-500 dark:text-slate-400">
            {isSignup ? 'Sign up to start automating your GST' : 'Log in to manage your GST filings'}
          </p>
        </div>

        {!isSignup && (
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-8">
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isOTP ? 'bg-white dark:bg-dark-card shadow text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              onClick={() => setIsOTP(false)}
            >
              Email & Password
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isOTP ? 'bg-white dark:bg-dark-card shadow text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              onClick={() => setIsOTP(true)}
            >
              Mobile OTP
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {(!isOTP || isSignup) && (
            <>
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input type="text" required className="input-field pl-10" placeholder="John Doe" />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input type="email" required className="input-field pl-10" placeholder="seller@ecommerce.com" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  {!isSignup && <a href="#" className="text-sm text-primary-600 hover:underline font-medium">Forgot?</a>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input type="password" required className="input-field pl-10" placeholder="••••••••" />
                </div>
              </div>
            </>
          )}

          {isOTP && !isSignup && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mobile Number</label>
              <div className="flex gap-2">
                <select className="input-field w-24 px-2">
                  <option>+91</option>
                  <option>+1</option>
                </select>
                <input type="tel" required className="input-field flex-1" placeholder="9876543210" />
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2 py-3 mt-4">
            {isSignup ? 'Create Account' : isOTP ? 'Send OTP' : 'Sign In'} <LogIn size={20} />
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
          {isSignup ? 'Already have an account?' : "Don't have an account?"} 
          <button 
            onClick={() => {
              setIsSignup(!isSignup);
              setIsOTP(false);
            }} 
            className="text-primary-600 font-bold hover:underline ml-1"
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe2, 
  FileJson, 
  CheckCircle, 
  Upload as UploadIcon, 
  Lock, 
  Mail, 
  ShieldCheck, 
  ChevronRight,
  UserCheck,
  ArrowLeft,
  Download,
  Calendar,
  FileText,
  RefreshCw,
  AlertCircle,
  X,
  Loader
} from 'lucide-react';

const GSTPortal = () => {
  const [phase, setPhase] = useState('login');
  const [loading, setLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setPhase('upload');
  };

  const handleUpload = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setLoading(false);
    setPhase('otp');
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').split('').slice(0, 6);
      const newOtp = [...otpValues];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtpValues(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      const input = document.querySelector(`input[name="otp-${nextIndex}"]`);
      if (input) input.focus();
    } else {
      const newOtp = [...otpValues];
      newOtp[index] = value.replace(/\D/g, '');
      setOtpValues(newOtp);
      if (value && index < 5) {
        const input = document.querySelector(`input[name="otp-${index + 1}"]`);
        if (input) input.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const input = document.querySelector(`input[name="otp-${index - 1}"]`);
      if (input) input.focus();
    }
  };

  const handleVerify = async () => {
    if (otpValues.join('').length !== 6) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setPhase('success');
  };

  const receipt = {
    arn: 'AA2702241234567',
    date: '10 Feb 2024',
    time: '11:45 AM',
    platform: 'Amazon India',
    period: 'February 2024',
    status: 'VERIFIED',
    taxAmount: '₹4,21,890.00'
  };

  const steps = [
    { id: 'login', label: 'Login', icon: Lock },
    { id: 'upload', label: 'Upload JSON', icon: UploadIcon },
    { id: 'otp', label: 'OTP Verify', icon: Mail },
    { id: 'success', label: 'Filed', icon: CheckCircle }
  ];

  const getStepStatus = (stepId) => {
    const phases = ['login', 'upload', 'otp', 'success'];
    const currentIndex = phases.indexOf(phase);
    const stepIndex = phases.indexOf(stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center justify-center gap-3">
          <Globe2 className="text-primary-600" size={32} /> GST Portal Sync
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
          Upload your validated GSTR-1 data directly to the GST portal with OTP verification.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="card p-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, i) => {
            const status = getStepStatus(step.id);
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div className={`flex flex-col items-center relative ${status !== 'pending' ? 'text-primary-600' : 'text-slate-400'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-bold mb-2 transition-all duration-300
                    ${status === 'completed' ? 'border-emerald-500 bg-emerald-500 text-white' : 
                      status === 'active' ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 
                      'border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-card'}`}
                  >
                    {status === 'completed' ? (
                      <CheckCircle size={22} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider absolute -bottom-6 whitespace-nowrap">
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-3 rounded transition-all duration-300 ${
                    status === 'completed' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Action Card */}
      <div className="card max-w-md mx-auto overflow-hidden shadow-2xl mt-8">
        
        {/* Phase 1: Login */}
        {phase === 'login' && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-900/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Portal Authentication</h3>
              <p className="text-sm text-slate-500 mt-1">Enter your GST Portal credentials</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Username / GSTIN</label>
                <input 
                  type="text" 
                  defaultValue="27AAPCU1294G1Z9" 
                  className="input-field" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <input 
                  type="password" 
                  defaultValue="••••••••" 
                  className="input-field" 
                  required 
                />
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 rounded" defaultChecked />
                  <span className="text-sm text-slate-600">Remember this device</span>
                </label>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" /> Connecting...
                  </>
                ) : (
                  <>Login to Portal <ChevronRight size={18} /></>
                )}
              </button>
            </form>
            
            <p className="text-center text-xs text-slate-400 mt-6">
              Your credentials are encrypted and never stored.
            </p>
          </div>
        )}

        {/* Phase 2: Upload JSON */}
        {phase === 'upload' && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileJson className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Upload GSTR-1 JSON</h3>
              <p className="text-sm text-slate-500 mt-1">Your validated data is ready for filing</p>
            </div>
            
            {/* File Preview */}
            <div className="border-2 border-dashed border-blue-200 dark:border-blue-800/50 bg-blue-50/30 dark:bg-blue-900/10 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center shadow-sm">
                  <FileJson className="text-blue-600" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-800 dark:text-white truncate">amazon_feb_2024_GSTR1.json</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle size={12} /> Validated
                    </span>
                    <span className="text-xs text-slate-500">1,245 Records</span>
                    <span className="text-xs text-slate-500">24.5 KB</span>
                  </div>
                </div>
              </div>
              
              {/* Tax Summary */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-blue-100 dark:border-blue-900/50">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800 dark:text-white">₹6.2L</p>
                  <p className="text-[10px] text-slate-500">Total Taxable</p>
                </div>
                <div className="text-center border-l border-r border-blue-100 dark:border-blue-900/50">
                  <p className="text-lg font-bold text-slate-800 dark:text-white">₹62K</p>
                  <p className="text-[10px] text-slate-500">CGST + SGST</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-600">₹0</p>
                  <p className="text-[10px] text-slate-500">IGST</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleUpload} 
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <UploadIcon size={18} /> Upload to GST Portal
                </>
              )}
            </button>
            
            <button 
              onClick={() => setPhase('login')} 
              className="w-full text-sm text-slate-500 mt-4 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Back to Login
            </button>
          </div>
        )}

        {/* Phase 3: OTP Verification */}
        {phase === 'otp' && (
          <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Email OTP Verification</h3>
              <p className="text-sm text-slate-500 mt-1">
                Enter the 6-digit code sent to <strong>admin@sellerstore.in</strong>
              </p>
            </div>
            
            {/* OTP Input */}
            <div className="flex gap-2 justify-center mb-6">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  name={`otp-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={6}
                  className="w-11 h-14 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-center text-xl font-bold bg-white dark:bg-dark-card focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                />
              ))}
            </div>
            
            <button 
              onClick={handleVerify} 
              disabled={loading || otpValues.join('').length !== 6}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  <UserCheck size={18} /> Verify & Complete Filing
                </>
              )}
            </button>
            
            <div className="text-center mt-6">
              <p className="text-xs text-slate-400 mb-2">Didn't receive the code?</p>
              <button className="text-sm text-primary-600 font-bold hover:underline flex items-center gap-1 mx-auto">
                <RefreshCw size={14} /> Resend OTP
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  The OTP was sent by the <strong>GST Portal</strong> (gst.gov.in), not by CAGST. Check your registered email spam folder.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Phase 4: Success */}
        {phase === 'success' && (
          <div className="p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-900/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
              <ShieldCheck size={48} className="text-emerald-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Filing Successful!</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
              Your GSTR-1 for February 2024 has been successfully uploaded and verified by the GST Portal.
            </p>
            
            {/* Acknowledgement Receipt */}
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 mb-6 text-left border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                  <FileText size={14} /> Acknowledgement Receipt
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">VERIFIED</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">ARN Number</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-white">{receipt.arn}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Filing Date</span>
                  <span className="font-medium text-slate-800 dark:text-white flex items-center gap-1">
                    <Calendar size={12} /> {receipt.date}, {receipt.time}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Period</span>
                  <span className="font-medium text-slate-800 dark:text-white">{receipt.period}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Platform</span>
                  <span className="font-medium text-slate-800 dark:text-white">{receipt.platform}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 font-medium">Total Tax</span>
                  <span className="font-bold text-lg text-emerald-600">{receipt.taxAmount}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="btn-secondary py-3 text-sm flex items-center justify-center gap-2">
                <Download size={16} /> Download Receipt
              </button>
              <button 
                onClick={() => { setPhase('login'); setOtpValues(['', '', '', '', '', '']); }}
                className="btn-primary py-3 text-sm"
              >
                New Filing
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Help Note */}
      {phase !== 'success' && (
        <div className="max-w-md mx-auto mt-8 p-4 bg-primary-50/50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 rounded-xl flex items-start gap-3">
          <ShieldCheck className="text-primary-600 mt-0.5 shrink-0" size={20} />
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <strong className="text-primary-700 dark:text-primary-300">Human Verification Step:</strong> 
            Ensure you have reviewed all flagged records in the{' '}
            <Link to="/app/verification" className="text-primary-600 font-bold hover:underline">
              Verification Panel
            </Link>{' '}
            before starting the Portal Sync.
          </div>
        </div>
      )}

      {/* What's Next */}
      {phase === 'success' && (
        <div className="max-w-md mx-auto mt-6 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-3">What's Next?</h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-500" /> 
              Download and save your ARN receipt
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-500" /> 
              GSTR-3B will be auto-populated within 2 days
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-500" /> 
              File GSTR-3B by 20th of next month
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GSTPortal;

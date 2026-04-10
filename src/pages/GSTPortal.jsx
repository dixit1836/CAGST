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
  ArrowLeft
} from 'lucide-react';

const GSTPortal = () => {
  const [phase, setPhase] = useState('login'); // login -> upload -> otp -> success

  const handleLogin = (e) => {
    e.preventDefault();
    setPhase('upload');
  };

  const handleUpload = () => {
    setPhase('otp');
  };

  const handleVerify = () => {
    setPhase('success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center justify-center gap-3">
          <Globe2 className="text-primary-600" size={32} /> GST Portal Sync
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
          Finalize your filing by logging into the GST Portal, uploading the validated JSON, and verifying via Email OTP.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center mb-10 max-w-2xl mx-auto">
        {[
          { id: 'login', label: 'Login' },
          { id: 'upload', label: 'Upload JSON' },
          { id: 'otp', label: 'OTP' },
          { id: 'success', label: 'Done' }
        ].map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className={`flex flex-col items-center relative ${phase === s.id ? 'text-primary-600' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold mb-2 transition-colors
                ${phase === s.id ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 
                  ['upload', 'otp', 'success'].slice(0, i).includes(phase) ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-card'}
              `}>
                {['upload', 'otp', 'success'].slice(0, i).includes(phase) ? <CheckCircle size={18} /> : i + 1}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider absolute -bottom-6 whitespace-nowrap">{s.label}</span>
            </div>
            {i < 3 && <div className={`h-0.5 flex-1 mx-4 ${['upload', 'otp', 'success'].slice(0, i+1).includes(phase) ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>}
          </div>
        ))}
      </div>

      {/* Main Action Area */}
      <div className="card max-w-md mx-auto overflow-hidden shadow-2xl mt-12">
        
        {/* Phase 1: Login */}
        {phase === 'login' && (
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Lock className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-bold">Portal Authentication</h3>
              <p className="text-sm text-slate-500">Enter your GST Portal credentials to continue.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Username / GSTIN</label>
                <input type="text" defaultValue="27AAPCU1294G1Z9" className="input-field" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
                <input type="password" defaultValue="••••••••" className="input-field" required />
              </div>
              <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-6">
                Login to Portal <ChevronRight size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Phase 2: Upload JSON */}
        {phase === 'upload' && (
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                 <FileJson className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-bold">Upload Prepared JSON</h3>
              <p className="text-sm text-slate-500">Your validated data is ready as a GSTR-1 compliant JSON.</p>
            </div>
            <div className="border-2 border-dashed border-primary-200 dark:border-primary-800/50 bg-primary-50/30 dark:bg-primary-900/10 rounded-xl p-6 mb-6">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-white dark:bg-dark-card rounded-lg flex items-center justify-center shadow-sm">
                   <FileJson className="text-primary-600" size={20} />
                 </div>
                 <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-sm truncate">amazon_feb_2024_GSTR1.json</p>
                    <p className="text-xs text-slate-500 capitalize">Ready • 1,245 Records</p>
                 </div>
               </div>
            </div>
            <button onClick={handleUpload} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
              <UploadIcon size={18} /> Upload to GST Portal
            </button>
            <button onClick={() => setPhase('login')} className="w-full text-sm text-slate-500 mt-4 hover:underline">
              Back to Login
            </button>
          </div>
        )}

        {/* Phase 3: OTP Verification */}
        {phase === 'otp' && (
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Mail className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-bold">Email OTP Verification</h3>
              <p className="text-sm text-slate-500">A verification code has been sent to <strong>admin@userstore.com</strong> by the GST System.</p>
            </div>
            <div className="flex gap-2 justify-between mb-8">
              {[1,2,3,4,5,6].map(i => (
                <input key={i} type="text" maxLength={1} className="w-12 h-14 border-2 border-slate-200 dark:border-slate-800 rounded-lg text-center text-xl font-bold bg-white dark:bg-dark-card focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all" />
              ))}
            </div>
            <button onClick={handleVerify} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
              <UserCheck size={18} /> Verify and Complete
            </button>
            <div className="text-center mt-6">
              <p className="text-xs text-slate-500 mb-1">Didn't receive code?</p>
              <button className="text-sm text-primary-600 font-bold hover:underline">Resend OTP</button>
            </div>
          </div>
        )}

        {/* Phase 4: Success */}
        {phase === 'success' && (
          <div className="p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 shadow-xl shadow-emerald-500/20">
              <ShieldCheck size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Filing Successful!</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
              Your GSTR-1 for February 2024 has been successfully uploaded and verified.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 mb-8 text-left border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400 uppercase">Acknowledgement Receipt</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">VERIFIED</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">ARN</span>
                  <span className="font-mono font-bold">AA2702241234567</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Date</span>
                  <span className="font-medium">10 Feb 2024, 11:45 AM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Platform</span>
                  <span className="font-medium">Amazon India</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="btn-secondary py-3 text-sm">Download Receipt</button>
              <button onClick={() => setPhase('login')} className="btn-primary py-3 text-sm">New Filing</button>
            </div>
          </div>
        )}
      </div>

      {/* Manual Verification Reminder */}
      <div className="max-w-md mx-auto mt-10 p-4 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800/30 rounded-xl flex items-start gap-3">
         <ShieldCheck className="text-primary-600 mt-1 shrink-0" size={20} />
         <p className="text-xs text-slate-600 dark:text-slate-400">
           <strong>Human Verification Step:</strong> Ensure you have reviewed the flagged records in the <Link to="/app/verification" className="text-primary-600 font-bold hover:underline">Verification Panel</Link> before starting the Portal Sync.
         </p>
      </div>
    </div>
  );
};

export default GSTPortal;

import { useState } from 'react';
import { 
  Globe2, 
  Settings, 
  RefreshCcw, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle,
  AlertCircle,
  ToggleLeft as Toggle,
  Lock,
  ArrowRight
} from 'lucide-react';

const Integrations = () => {
  const [platforms, setPlatforms] = useState([
    { 
      id: 'amazon', 
      name: 'Amazon Seller Central', 
      connected: true, 
      lastSync: '10 Feb 2024, 02:15 PM', 
      autoSync: true,
      status: 'Active'
    },
    { 
      id: 'flipkart', 
      name: 'Flipkart Seller Hub', 
      connected: false, 
      lastSync: 'Never', 
      autoSync: false,
      status: 'Disconnected'
    },
    { 
      id: 'meesho', 
      name: 'Meesho Supplier Panel', 
      connected: true, 
      lastSync: '09 Feb 2024, 11:30 AM', 
      autoSync: false,
      status: 'Needs Re-auth'
    }
  ]);

  const toggleAutoSync = (id) => {
    setPlatforms(platforms.map(p => 
      p.id === id ? { ...p, autoSync: !p.autoSync } : p
    ));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">API Integrations</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Connect your e-commerce store APIs to automate data fetching. No more manual report downloads.
        </p>
      </div>

      {/* Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <div key={platform.id} className="card flex flex-col hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-slate-50 dark:border-slate-800">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-lg text-slate-600 dark:text-slate-300">
                  {platform.name.charAt(0)}
                </div>
                <div className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                  platform.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  platform.status === 'Needs Re-auth' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {platform.status.toUpperCase()}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1">{platform.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Merchant Token: {platform.connected ? '•••••••42x9' : 'Not Linked'}</p>
            </div>
            
            <div className="p-6 flex-1 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">Automatic Sync</p>
                  <p className="text-xs text-slate-400">Monthly auto-fetch data</p>
                </div>
                <button 
                  onClick={() => toggleAutoSync(platform.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${platform.autoSync ? 'bg-primary-600' : 'bg-slate-200'}`}
                  disabled={!platform.connected}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${platform.autoSync ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xs font-medium text-slate-500 uppercase">Last Data Pull</p>
                <p className="text-xs font-medium">{platform.lastSync}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
              {platform.connected ? (
                <button className="w-full btn-secondary text-sm flex items-center justify-center gap-2">
                  <RefreshCcw size={14} /> Refresh Data
                </button>
              ) : (
                <button className="w-full btn-primary text-sm flex items-center justify-center gap-2">
                  Connect Account <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Settings */}
      <div className="card mt-10">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Settings size={20} className="text-primary-600" /> Automation Settings
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Sync Schedule</label>
              <select className="input-field">
                <option>Monthly (1st of every month)</option>
                <option>Weekly (Every Monday)</option>
                <option>Daily (Every night at 2:00 AM)</option>
                <option>On Demand only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Data Conflict Policy</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="conflict" defaultChecked className="text-primary-600" />
                  <span className="text-sm">Prefer API data</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="conflict" className="text-primary-600" />
                  <span className="text-sm">Manual Override</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-xl p-5 flex gap-4">
             <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-full h-fit">
                <ShieldCheck className="text-emerald-600 transition-colors" size={24} />
             </div>
             <div>
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Secure OAuth 2.0</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">
                  Your credentials are never stored. We use temporary access tokens provided by Amazon, Flipkart, and Meesho to securely fetch your transactional data.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-4 items-center">
          <AlertCircle size={24} className="text-slate-500" />
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Pro Tip:</strong> Enabling Auto-Sync reduces manual errors and ensures you never miss a filing deadline. All synced data will appear in "Pendings" for your final review.
          </p>
        </div>
        <button className="btn-secondary whitespace-nowrap">View Security Whitepaper</button>
      </div>
    </div>
  );
};

export default Integrations;

import { useState } from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  CreditCard, 
  Key, 
  Globe,
  Mail,
  Smartphone,
  CheckCircle,
  Save,
  Plus,
  Trash2,
  Edit2,
  Loader
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'business', label: 'Business', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="card">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Profile Information</h3>
                <p className="text-sm text-slate-500 mt-1">Update your personal information and profile picture.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                    US
                  </div>
                  <div>
                    <button className="btn-secondary text-sm">Upload New Photo</button>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                    <input type="text" defaultValue="Rahul Kumar" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input type="email" defaultValue="rahul@sellerstore.in" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role</label>
                    <select className="input-field">
                      <option>Account Owner</option>
                      <option>Admin</option>
                      <option>Accountant</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
                    {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Business Settings */}
          {activeTab === 'business' && (
            <div className="card">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Business Details</h3>
                <p className="text-sm text-slate-500 mt-1">Manage your business information and GST details.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Business Name</label>
                    <input type="text" defaultValue="User Store Solutions" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">GSTIN</label>
                    <input type="text" defaultValue="27AAPCU1294G1Z9" className="input-field font-mono" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Business Address</label>
                    <textarea defaultValue="123, Tech Park, Whitefield Road, Bangalore - 560066, Karnataka" className="input-field h-24 resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">State</label>
                    <select className="input-field">
                      <option>Karnataka</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Tamil Nadu</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">PIN Code</label>
                    <input type="text" defaultValue="560066" className="input-field" />
                  </div>
                </div>

                {/* Linked Entities */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white">Linked Entities</h4>
                      <p className="text-xs text-slate-500">Manage multiple businesses under one account</p>
                    </div>
                    <button className="btn-secondary text-sm flex items-center gap-2">
                      <Plus size={14} /> Add Entity
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                          <Building2 size={18} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">User Store Solutions</p>
                          <p className="text-xs text-slate-500 font-mono">27AAPCU1294G1Z9</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">ACTIVE</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
                    {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="card">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Notification Preferences</h3>
                <p className="text-sm text-slate-500 mt-1">Choose how you want to be notified.</p>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { title: 'Filing Reminders', desc: 'Get reminded before GST filing deadlines', enabled: true },
                  { title: 'Error Alerts', desc: 'Be notified when data errors are detected', enabled: true },
                  { title: 'Weekly Summary', desc: 'Receive a weekly summary of your filings', enabled: false },
                  { title: 'Marketing Updates', desc: 'News about new features and offers', enabled: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.enabled ? 'bg-primary-600' : 'bg-slate-200'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Notification Channels</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <Mail size={20} className="text-slate-400" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Email</p>
                        <p className="text-xs text-slate-500">rahul@sellerstore.in</p>
                      </div>
                      <CheckCircle size={16} className="text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <Smartphone size={20} className="text-slate-400" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">SMS</p>
                        <p className="text-xs text-slate-500">+91 98765 43210</p>
                      </div>
                      <CheckCircle size={16} className="text-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="card">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Security Settings</h3>
                <p className="text-sm text-slate-500 mt-1">Manage your password and security preferences.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800/50">
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">Password</p>
                    <p className="text-sm text-slate-500">Last changed 30 days ago</p>
                  </div>
                  <button className="btn-secondary text-sm">Change Password</button>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800/50">
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                  </div>
                  <button className="btn-primary text-sm">Enable 2FA</button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">Active Sessions</p>
                    <p className="text-sm text-slate-500">2 devices currently logged in</p>
                  </div>
                  <button className="btn-secondary text-sm text-red-600 hover:bg-red-50">Logout All</button>
                </div>
              </div>
            </div>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <div className="card">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">Billing & Subscription</h3>
                <p className="text-sm text-slate-500 mt-1">Manage your plan and payment methods.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="p-5 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-100 dark:border-primary-800/30 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Current Plan</span>
                      <h4 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">Professional</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">₹999/month</p>
                    </div>
                    <button className="btn-secondary text-sm">Upgrade Plan</button>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-800/50">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Plan includes:</p>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-1"><CheckCircle size={12} className="text-emerald-500" /> Unlimited Reports</li>
                      <li className="flex items-center gap-1"><CheckCircle size={12} className="text-emerald-500" /> All Marketplaces</li>
                      <li className="flex items-center gap-1"><CheckCircle size={12} className="text-emerald-500" /> API Access</li>
                      <li className="flex items-center gap-1"><CheckCircle size={12} className="text-emerald-500" /> Tally Export</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Payment Method</h4>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <CreditCard size={24} className="text-slate-400" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 dark:text-white">•••• •••• •••• 4242</p>
                      <p className="text-xs text-slate-500">Expires 12/26</p>
                    </div>
                    <button className="text-sm text-primary-600 hover:underline">Update</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Keys */}
          {activeTab === 'api' && (
            <div className="card">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">API Keys</h3>
                <p className="text-sm text-slate-500 mt-1">Manage API keys for programmatic access.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500">Generate an API key to access CAGST programmatically.</p>
                  </div>
                  <button className="btn-primary text-sm flex items-center gap-2">
                    <Plus size={14} /> Create API Key
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">Production Key</p>
                      <p className="text-xs text-slate-500 font-mono mt-1">sk_live_xxxxxxxxxxxxxxxxxxxxx</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">ACTIVE</span>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600"><Edit2 size={14} /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">Test Key</p>
                      <p className="text-xs text-slate-500 font-mono mt-1">sk_test_xxxxxxxxxxxxxxxxxxxxx</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">TEST</span>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600"><Edit2 size={14} /></button>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50/50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 rounded-xl p-4">
                  <p className="text-xs text-primary-700 dark:text-primary-400">
                    <strong>Note:</strong> Keep your API keys secure. Do not share them in public repositories or client-side code.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

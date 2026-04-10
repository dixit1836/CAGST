import { useState } from 'react';
import { AlertCircle, CheckCircle, Search, Save, X, KeySquare, Edit3, Check, Filter, Eye, ChevronDown, AlertTriangle } from 'lucide-react';

const Verification = () => {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const verificationData = [
    { id: 1, orderId: "AMZ-993-8472", gstin: "27AAPCU1294G1Z9", amount: "4,120.00", tax: "741.60", match: true, type: 'B2B' },
    { id: 2, orderId: "AMZ-993-8473", gstin: "Unregistered", amount: "1,500.00", tax: "270.00", match: true, type: 'B2C' },
    { id: 3, orderId: "AMZ-993-8474", gstin: "08BUPPT2344B1Z!", amount: "8,490.00", tax: "1,528.20", match: false, error: "Invalid GSTIN format", type: 'B2B' },
    { id: 4, orderId: "AMZ-993-8475", gstin: "29AABCU9603R1ZX", amount: "0.00", tax: "0.00", match: false, error: "Zero amount anomaly", type: 'B2B' },
    { id: 5, orderId: "AMZ-993-8476", gstin: "07AAACU1234A1Z5", amount: "12,400.00", tax: "2,232.00", match: true, type: 'B2B' },
    { id: 6, orderId: "AMZ-993-8477", gstin: "22AAAAA0000A1ZA", amount: "5,200.00", tax: "936.00", match: false, error: "GSTIN mismatch", type: 'B2B' },
    { id: 7, orderId: "AMZ-993-8478", gstin: "Unregistered", amount: "890.00", tax: "160.20", match: true, type: 'B2C' },
    { id: 8, orderId: "AMZ-993-8479", gstin: "19AABCU1234D1ZM", amount: "15,000.00", tax: "2,700.00", match: true, type: 'B2B' },
  ];

  const stats = {
    total: 1245,
    valid: 1243,
    flagged: 2,
    b2b: 890,
    b2c: 355
  };

  const filteredData = activeTab === 'all' 
    ? verificationData 
    : activeTab === 'errors' 
      ? verificationData.filter(d => !d.match)
      : verificationData.filter(d => d.type === activeTab);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({ gstin: item.gstin, amount: item.amount, tax: item.tax });
  };

  const handleSaveEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleApproveAll = () => {
    setShowOTPModal(true);
  };

  const handleOTPVerify = () => {
    setIsApproved(true);
    setShowOTPModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Data Verification</h2>
          <p className="text-slate-500 dark:text-slate-400">Review and correct flagged data before GST portal submission.</p>
        </div>
        <div className="flex gap-3 items-center">
          {!isApproved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50 font-medium text-sm">
              <AlertCircle size={16} /> {verificationData.filter(d => !d.match).length} Issues Found
            </span>
          )}
          {isApproved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 font-medium text-sm">
              <CheckCircle size={16} /> Verified & Approved
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar - Summary */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Batch Info */}
          <div className="card p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Current Batch</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                <FileText size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800 dark:text-white">amazon_feb_2024.zip</p>
                <p className="text-xs text-slate-500">Feb 2024 • Amazon</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Batch Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-400">Total Records</span>
                <span className="font-bold text-slate-800 dark:text-white">{stats.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-400">Valid Records</span>
                <span className="font-bold text-emerald-600">{stats.valid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-400">Flagged Issues</span>
                <span className="font-bold text-red-600">{stats.flagged}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-400">B2B Invoices</span>
                <span className="font-bold text-slate-800 dark:text-white">{stats.b2b.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">B2C Invoices</span>
                <span className="font-bold text-slate-800 dark:text-white">{stats.b2c.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Approval Card */}
          <div className="card p-5 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-800/50">
            {isApproved ? (
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={28} className="text-emerald-600" />
                </div>
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">Batch Verified</h4>
                <p className="text-xs text-slate-500">Ready for GST Portal submission.</p>
                <button className="btn-primary w-full mt-4 text-sm">Proceed to Filing</button>
              </div>
            ) : (
              <div>
                <h4 className="font-bold text-sm mb-2">Manual Override</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Fix flagged issues or use OTP verification to approve despite anomalies.
                </p>
                <button 
                  onClick={handleApproveAll} 
                  className="w-full btn-primary text-sm flex items-center justify-center gap-2"
                >
                  <KeySquare size={14} /> Approve via OTP
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  By approving, you take responsibility for flagged data.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Data Grid */}
        <div className="lg:col-span-3">
          <div className="card overflow-hidden">
            
            {/* Tab Bar */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50/50 dark:bg-slate-900/30">
              
              {/* Tabs */}
              <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm">
                {[
                  { id: 'all', label: 'All Records' },
                  { id: 'errors', label: 'Errors Only', count: 2 },
                  { id: 'B2B', label: 'B2B Only' },
                  { id: 'B2C', label: 'B2C Only' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2
                      ${activeTab === tab.id 
                        ? 'bg-white dark:bg-dark-card shadow text-primary-600' 
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'}`}
                  >
                    {tab.label}
                    {tab.count && (
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold flex items-center justify-center">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search order ID..." 
                  className="input-field text-sm pl-9 py-1.5 h-9 w-full"
                />
              </div>
            </div>
          
            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase">
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">GSTIN</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-right">Tax</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`border-b border-slate-50 dark:border-slate-800/50 transition-colors ${
                        !row.match 
                          ? 'bg-red-50/50 dark:bg-red-900/10' 
                          : editingId === row.id 
                            ? 'bg-primary-50/50 dark:bg-primary-900/10'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                          row.type === 'B2B' 
                            ? 'bg-indigo-50 text-indigo-600' 
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">{row.orderId}</td>
                      
                      {/* GSTIN */}
                      <td className="py-3 px-4">
                        {editingId === row.id ? (
                          <input 
                            type="text" 
                            value={editData.gstin}
                            onChange={(e) => setEditData({...editData, gstin: e.target.value})}
                            className="input-field py-1 px-2 h-7 text-sm w-36"
                          />
                        ) : (
                          <span className="font-mono text-xs">{row.gstin}</span>
                        )}
                        {!row.match && row.error && (
                          <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1">
                            <AlertTriangle size={10} /> {row.error}
                          </p>
                        )}
                      </td>
                      
                      {/* Amount */}
                      <td className="py-3 px-4 text-right">
                        {editingId === row.id ? (
                          <input 
                            type="text" 
                            value={editData.amount}
                            onChange={(e) => setEditData({...editData, amount: e.target.value})}
                            className="input-field py-1 px-2 h-7 text-sm w-24 text-right"
                          />
                        ) : (
                          <span className="font-mono">₹{row.amount}</span>
                        )}
                      </td>
                      
                      {/* Tax */}
                      <td className="py-3 px-4 text-right">
                        <span className="font-mono">₹{row.tax}</span>
                      </td>
                      
                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        {row.match ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
                            <CheckCircle size={14} /> Valid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 text-xs font-medium">
                            <AlertCircle size={14} /> Error
                          </span>
                        )}
                      </td>
                      
                      {/* Actions */}
                      <td className="py-3 px-4 text-center">
                        {editingId === row.id ? (
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              onClick={() => handleSaveEdit()}
                              className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors"
                              title="Save"
                            >
                              <Check size={14} />
                            </button>
                            <button 
                              onClick={() => setEditingId(null)}
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded transition-colors"
                              title="Cancel"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              onClick={() => handleEdit(row)}
                              className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredData.length} of {verificationData.length} records</span>
              <div className="flex items-center gap-2">
                <span>Per page:</span>
                <select className="input-field py-1 px-2 h-7 text-xs">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowOTPModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                <KeySquare size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Override Verification</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enter the 6-digit OTP sent to your registered mobile to approve the batch despite {verificationData.filter(d => !d.match).length} anomalies.
              </p>
            </div>
            
            <div className="flex gap-2 justify-center mb-6">
              {[1,2,3,4,5,6].map((_, i) => (
                <input 
                  key={i} 
                  type="text" 
                  maxLength={1} 
                  className="w-11 h-12 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-center text-xl font-bold bg-slate-50 dark:bg-slate-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
                />
              ))}
            </div>
            
            <button 
              onClick={handleOTPVerify}
              className="w-full btn-primary py-3 font-semibold"
            >
              Verify & Approve Batch
            </button>
            
            <div className="text-center mt-4">
              <p className="text-xs text-slate-400 mb-1">Didn't receive the code?</p>
              <button className="text-sm text-primary-600 font-bold hover:underline">Resend OTP</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;

const FileText = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

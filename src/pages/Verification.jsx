import { useState } from 'react';
import { AlertCircle, CheckCircle, Search, Save, X, KeySquare } from 'lucide-react';

const Verification = () => {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  // Mock data representing extracted JSON entries with validation issues
  const verificationData = [
    { id: 1, orderId: "AMZ-993-8472", gstin: "27AAPCU1294G1Z9", amount: "₹4,120", tax: "₹741.60", match: true },
    { id: 2, orderId: "AMZ-993-8473", gstin: "Unregistered", amount: "₹1,500", tax: "₹270.00", match: true },
    { id: 3, orderId: "AMZ-993-8474", gstin: "08BUPPT2344B1Z!", amount: "₹8,490", tax: "₹1,528.20", match: false, error: "Invalid GSTIN format" },
    { id: 4, orderId: "AMZ-993-8475", gstin: "29AABCU9603R1ZX", amount: "₹0.00", tax: "₹0.00", match: false, error: "Zero amount anomaly" },
    { id: 5, orderId: "AMZ-993-8476", gstin: "07AAACU1234A1Z5", amount: "₹12,400", tax: "₹2,232.00", match: true },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Data Verification</h2>
          <p className="text-slate-500 dark:text-slate-400">Review mismatched or corrupted data before uploading to GST portal.</p>
        </div>
        {!isApproved && (
          <div className="flex gap-3">
             <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50 font-medium text-sm">
               <AlertCircle size={16} /> 2 Issues Found
             </span>
          </div>
        )}
      </div>

      <div className="card flex flex-col md:flex-row shadow-sm">
        {/* Left Side: Summary Panel */}
        <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Current Batch Scan</h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">amazon_feb_2024.zip</p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Total Records</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">1,245</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Valid Records</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">1,243</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Flagged Issues</span>
              <span className="font-medium text-red-600 dark:text-red-400">2</span>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm relative">
            <h4 className="font-semibold mb-2">Manual Override Required</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Fix the structural issues on the right or provide explicit approval via OTP if you wish to proceed ignoring these anomalies.
            </p>
            {isApproved ? (
              <div className="w-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 flex justify-center items-center gap-2 font-medium">
                 <CheckCircle size={18} /> Verified Log
              </div>
            ) : (
               <button onClick={() => setShowOTPModal(true)} className="w-full btn-primary flex justify-center items-center gap-2 disabled:opacity-50">
                 <KeySquare size={18} /> Approve via OTP
               </button>
            )}
          </div>
        </div>

        {/* Right Side: Data Grid */}
        <div className="md:w-2/3 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Detailed Scan View</h3>
            <div className="flex gap-2">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mr-4">
                <button className="px-3 py-1 text-[10px] font-bold rounded bg-white shadow text-primary-600">ALL</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-500">B2B Only</button>
                <button className="px-3 py-1 text-[10px] font-bold text-slate-500">B2C Only</button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search order ID..." className="input-field text-sm pl-9 py-1.5 h-8 w-48" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg flex-1">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <th className="py-3 px-4 font-medium">Type</th>
                  <th className="py-3 px-4 font-medium">Order ID</th>
                  <th className="py-3 px-4 font-medium">GSTIN</th>
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {verificationData.map((row) => (
                  <tr key={row.id} className={`border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${!row.match ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}>
                    <td className="py-3 px-4">
                       <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${row.gstin === 'Unregistered' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                          {row.gstin === 'Unregistered' ? 'B2C' : 'B2B'}
                       </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">{row.orderId}</td>
                    <td className="py-3 px-4">
                      {!row.match && row.error === "Invalid GSTIN format" ? (
                        <div className="relative flex flex-col gap-1">
                          <input type="text" defaultValue={row.gstin} className="input-field py-1 px-2 h-8 text-sm border-red-300 focus:ring-red-500" />
                          <span className="text-[10px] text-red-500">{row.error}</span>
                        </div>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-300">{row.gstin}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {!row.match && row.error === "Zero amount anomaly" ? (
                        <div className="relative flex flex-col gap-1">
                          <input type="text" defaultValue={row.amount} className="input-field py-1 px-2 h-8 text-sm border-red-300 focus:ring-red-500" />
                          <span className="text-[10px] text-red-500">{row.error}</span>
                        </div>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-300">{row.amount}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {!row.match ? (
                         <div className="flex gap-2">
                           <button className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded transition-colors text-xs font-medium flex items-center gap-1">
                             <Save size={14} /> Update
                           </button>
                         </div>
                      ) : (
                         <span className="text-emerald-500 text-xs font-medium flex items-center gap-1"><CheckCircle size={14} /> Valid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowOTPModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-amber-200"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto mb-4">
                <KeySquare size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Override Verification</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enter the OTP sent to your registered mobile number to approve the batch despite anomalies.
              </p>
            </div>
            
            <div className="flex gap-2 justify-center mb-8">
              {[1,2,3,4,5,6].map(i => (
                <input key={i} type="text" maxLength={1} className="w-10 h-10 border border-slate-300 dark:border-slate-600 rounded text-center text-lg font-bold bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none" />
              ))}
            </div>
            
            <button 
              onClick={() => {
                setIsApproved(true);
                setShowOTPModal(false);
              }}
              className="w-full btn-primary"
            >
              Verify & Approve
            </button>
            <div className="text-center mt-4">
              <button className="text-sm text-primary-600 hover:underline">Resend OTP</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Verification;

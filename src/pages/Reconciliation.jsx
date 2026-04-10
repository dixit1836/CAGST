import { useState } from 'react';
import { 
  FileCheck, 
  ArrowLeftRight, 
  Search, 
  Filter, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

const Reconciliation = () => {
  const [reconType, setReconType] = useState('2a'); // 2a or 2b

  const mockData = [
    { supplier: 'Office Depot', gstin: '27AAACD1234A1Z1', portalTax: '₹12,400', purchaseTax: '₹12,400', diff: '₹0', status: 'Matched' },
    { supplier: 'Cloud Services Int', gstin: '07BBBCD5678B1Z2', portalTax: '₹4,500', purchaseTax: '₹4,000', diff: '+₹500', status: 'Mismatched' },
    { supplier: 'Logistic Partners', gstin: '09AAACD9012C1Z3', portalTax: '₹0', purchaseTax: '₹2,500', diff: '-₹2,500', status: 'Missing in Portal' },
    { supplier: 'Amazon AWS', gstin: '27AAACD4321D1Z4', portalTax: '₹8,900', purchaseTax: '₹8,900', diff: '₹0', status: 'Matched' },
    { supplier: 'Flipkart Delivery', gstin: '29AAACD8765E1Z5', portalTax: '₹1,200', purchaseTax: '₹0', diff: '+₹1,200', status: 'Missing in Books' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <ArrowLeftRight className="text-primary-600" /> Books vs Portal Reconciliation
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Match your Purchase Register with GSTR-2A/2B data automatically.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
            <Download size={16} /> Export Reconciliation Report
          </button>
          <button className="btn-primary px-4 py-2 text-sm">
            Run Auto-Match
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5 border-l-4 border-l-emerald-500">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Matched</p>
          <p className="text-2xl font-bold">₹14.2L</p>
          <p className="text-[10px] text-emerald-600 font-medium">142 Invoices</p>
        </div>
        <div className="card p-5 border-l-4 border-l-red-500">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Mismatched</p>
          <p className="text-2xl font-bold">₹1.2L</p>
          <p className="text-[10px] text-red-600 font-medium">12 Invoices</p>
        </div>
        <div className="card p-5 border-l-4 border-l-amber-500">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Missing in Portal</p>
          <p className="text-2xl font-bold">₹0.5L</p>
          <p className="text-[10px] text-amber-600 font-medium">5 Invoices</p>
        </div>
        <div className="card p-5 border-l-4 border-l-indigo-500">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Missing in Books</p>
          <p className="text-2xl font-bold">₹0.3L</p>
          <p className="text-[10px] text-indigo-600 font-medium">3 Invoices</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        {/* Tabs & Filters */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-lg">
             <button 
               onClick={() => setReconType('2a')}
               className={`px-6 py-1.5 text-xs font-bold rounded-md transition-all ${reconType === '2a' ? 'bg-white dark:bg-dark-card shadow text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
               GSTR-2A
             </button>
             <button 
               onClick={() => setReconType('2b')}
               className={`px-6 py-1.5 text-xs font-bold rounded-md transition-all ${reconType === '2b' ? 'bg-white dark:bg-dark-card shadow text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
               GSTR-2B
             </button>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search supplier..." className="input-field pl-10 h-9 py-1 text-sm outline-none" />
            </div>
            <button className="btn-secondary px-3 py-1.5 border-slate-200">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                <th className="py-4 px-6">Supplier Name</th>
                <th className="py-4 px-6">GSTIN</th>
                <th className="py-4 px-6 text-right">Portal Tax</th>
                <th className="py-4 px-6 text-right">Books Tax</th>
                <th className="py-4 px-6 text-right">Difference</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-800 dark:text-slate-200">{row.supplier}</td>
                  <td className="py-4 px-6 font-mono text-xs">{row.gstin}</td>
                  <td className="py-4 px-6 text-right text-slate-600 dark:text-slate-300">{row.portalTax}</td>
                  <td className="py-4 px-6 text-right text-slate-600 dark:text-slate-300">{row.purchaseTax}</td>
                  <td className={`py-4 px-6 text-right font-bold ${row.diff === '₹0' ? 'text-slate-400' : row.diff.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {row.diff}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap
                      ${row.status === 'Matched' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        row.status === 'Mismatched' ? 'bg-red-50 text-red-700 border-red-200' : 
                        'bg-amber-50 text-amber-700 border-amber-200'}
                    `}>
                      {row.status === 'Matched' ? <CheckCircle2 size={12} /> : row.status === 'Mismatched' ? <AlertTriangle size={12} /> : <Clock size={12} />}
                      {row.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-primary-900/10 rounded-2xl p-6 border border-primary-100 dark:border-primary-800/40">
        <h4 className="font-bold text-primary-800 dark:text-primary-300 mb-2">Automated Supplier Follow-up</h4>
        <p className="text-sm text-primary-700 dark:text-primary-400 mb-4 max-w-2xl">
          We found 5 invoices missing in the portal. Send an automated email reminder to these suppliers to upload their data for you to claim ITC.
        </p>
        <button className="btn-primary text-sm px-6 py-2">Email Vendors</button>
      </div>
    </div>
  );
};

export default Reconciliation;

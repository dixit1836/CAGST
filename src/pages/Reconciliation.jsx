import { useState } from 'react';
import { 
  FileCheck, 
  ArrowLeftRight, 
  Search, 
  Filter, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  RefreshCw,
  Mail,
  ChevronRight,
  FileText,
  DollarSign,
  Percent
} from 'lucide-react';

const Reconciliation = () => {
  const [reconType, setReconType] = useState('2a');
  const [isAutoMatching, setIsAutoMatching] = useState(false);
  const [matchProgress, setMatchProgress] = useState(0);

  const mockData = [
    { id: 1, supplier: 'Office Depot Solutions', gstin: '27AAACD1234A1Z1', portalTax: '12,400.00', purchaseTax: '12,400.00', diff: '0.00', status: 'matched' },
    { id: 2, supplier: 'Cloud Services International', gstin: '07BBBCD5678B1Z2', portalTax: '4,500.00', purchaseTax: '4,000.00', diff: '500.00', status: 'mismatched' },
    { id: 3, supplier: 'Logistic Partners LLP', gstin: '09AAACD9012C1Z3', portalTax: '0.00', purchaseTax: '2,500.00', diff: '-2,500.00', status: 'missing_portal' },
    { id: 4, supplier: 'Amazon Web Services', gstin: '27AAACD4321D1Z4', portalTax: '8,900.00', purchaseTax: '8,900.00', diff: '0.00', status: 'matched' },
    { id: 5, supplier: 'Flipkart Logistics', gstin: '29AAACD8765E1Z5', portalTax: '1,200.00', purchaseTax: '0.00', diff: '1,200.00', status: 'missing_books' },
    { id: 6, supplier: 'Digital Marketing Agency', gstin: '19AABCU9876P1Z8', portalTax: '3,200.00', purchaseTax: '3,200.00', diff: '0.00', status: 'matched' },
    { id: 7, supplier: 'Packaging Solutions', gstin: '22AAAAA1234B1Z9', portalTax: '5,600.00', purchaseTax: '5,800.00', diff: '-200.00', status: 'mismatched' },
    { id: 8, supplier: 'IT Support Services', gstin: '29AAACM5432K1L0', portalTax: '0.00', purchaseTax: '1,500.00', diff: '-1,500.00', status: 'missing_portal' },
  ];

  const stats = {
    totalRecords: 156,
    matched: 142,
    mismatched: 8,
    missingPortal: 4,
    missingBooks: 2,
    totalPortalTax: '₹15.2L',
    totalBooksTax: '₹14.7L',
    totalDiff: '₹0.5L'
  };

  const runAutoMatch = () => {
    setIsAutoMatching(true);
    setMatchProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setMatchProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsAutoMatching(false);
      }
    }, 200);
  };

  const getStatusBadge = (status) => {
    const badges = {
      matched: { class: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400', icon: <CheckCircle2 size={12} />, label: 'MATCHED' },
      mismatched: { class: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400', icon: <AlertTriangle size={12} />, label: 'MISMATCHED' },
      missing_portal: { class: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400', icon: <Clock size={12} />, label: 'MISSING IN PORTAL' },
      missing_books: { class: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400', icon: <Clock size={12} />, label: 'MISSING IN BOOKS' }
    };
    const badge = badges[status] || badges.matched;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${badge.class}`}>
        {badge.icon} {badge.label}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <ArrowLeftRight className="text-primary-600" /> 
            GSTR-2A/2B Reconciliation
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Match your Purchase Register with GST Portal data for ITC claims.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
          <button 
            onClick={runAutoMatch}
            disabled={isAutoMatching}
            className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
          >
            {isAutoMatching ? (
              <>
                <RefreshCw size={16} className="animate-spin" /> Matching... {matchProgress}%
              </>
            ) : (
              <>
                <RefreshCw size={16} /> Run Auto-Match
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card p-4 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase">Matched</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{stats.matched}</p>
          <p className="text-xs text-emerald-600 mt-1">₹14.2L</p>
        </div>
        <div className="card p-4 border-l-4 border-l-red-500">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase">Mismatched</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.mismatched}</p>
          <p className="text-xs text-red-600 mt-1">₹0.7L difference</p>
        </div>
        <div className="card p-4 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-amber-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase">Missing in Portal</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{stats.missingPortal}</p>
          <p className="text-xs text-amber-600 mt-1">₹4.0L unreconciled</p>
        </div>
        <div className="card p-4 border-l-4 border-l-indigo-500">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} className="text-indigo-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase">Missing in Books</span>
          </div>
          <p className="text-2xl font-bold text-indigo-600">{stats.missingBooks}</p>
          <p className="text-xs text-indigo-600 mt-1">₹1.2L extra</p>
        </div>
        <div className="card p-4 border-l-4 border-l-primary-500">
          <div className="flex items-center gap-2 mb-2">
            <Percent size={16} className="text-primary-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase">Match Rate</span>
          </div>
          <p className="text-2xl font-bold text-primary-600">{Math.round((stats.matched / stats.totalRecords) * 100)}%</p>
          <p className="text-xs text-primary-600 mt-1">{stats.totalRecords} total records</p>
        </div>
      </div>

      {/* Progress Bar */}
      {isAutoMatching && (
        <div className="card p-4 bg-primary-50/50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Auto-Matching in Progress</span>
            <span className="text-sm font-bold text-primary-600">{matchProgress}%</span>
          </div>
          <div className="h-2 bg-primary-100 dark:bg-primary-900/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-300"
              style={{ width: `${matchProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="card overflow-hidden">
        {/* Tabs & Filters */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50/50 dark:bg-slate-900/30">
          
          {/* GSTR Type Toggle */}
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm">
            <button 
              onClick={() => setReconType('2a')}
              className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                reconType === '2a' 
                  ? 'bg-white dark:bg-dark-card shadow text-primary-600' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              GSTR-2A
            </button>
            <button 
              onClick={() => setReconType('2b')}
              className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                reconType === '2b' 
                  ? 'bg-white dark:bg-dark-card shadow text-primary-600' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              GSTR-2B
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search supplier or GSTIN..." 
                className="input-field pl-10 h-9 py-1 text-sm w-full"
              />
            </div>
            <button className="btn-secondary px-3 py-1.5 border-slate-200 dark:border-slate-700">
              <Filter size={16} />
            </button>
            <select className="input-field h-9 py-1 px-2 text-sm">
              <option>All Status</option>
              <option>Matched</option>
              <option>Mismatched</option>
              <option>Missing in Portal</option>
              <option>Missing in Books</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase">
                <th className="py-4 px-6">Supplier Name</th>
                <th className="py-4 px-6">GSTIN</th>
                <th className="py-4 px-6 text-right">Portal Tax (₹)</th>
                <th className="py-4 px-6 text-right">Books Tax (₹)</th>
                <th className="py-4 px-6 text-right">Difference (₹)</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row) => (
                <tr 
                  key={row.id} 
                  className={`border-b border-slate-50 dark:border-slate-800/50 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 ${
                    row.status === 'mismatched' ? 'bg-red-50/30 dark:bg-red-900/10' :
                    row.status === 'missing_portal' || row.status === 'missing_books' ? 'bg-amber-50/30 dark:bg-amber-900/10' : ''
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600">
                        {row.supplier.substring(0,2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{row.supplier}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-600 dark:text-slate-300">{row.gstin}</td>
                  <td className="py-4 px-6 text-right font-mono text-slate-600 dark:text-slate-300">
                    {row.portalTax === '0.00' ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      `₹${row.portalTax}`
                    )}
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-slate-600 dark:text-slate-300">
                    {row.purchaseTax === '0.00' ? (
                      <span className="text-slate-400">-</span>
                    ) : (
                      `₹${row.purchaseTax}`
                    )}
                  </td>
                  <td className={`py-4 px-6 text-right font-bold font-mono ${
                    row.diff === '0.00' ? 'text-slate-400' : 
                    parseFloat(row.diff) > 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {row.diff === '0.00' ? '₹0.00' : `₹${row.diff}`}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {getStatusBadge(row.status)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-primary-600 hover:text-primary-700 text-xs font-medium hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
          <span className="text-slate-500">Showing 1 to 8 of 156 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800" disabled>Prev</button>
            <button className="px-3 py-1 bg-primary-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">...</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">20</button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
          </div>
        </div>
      </div>

      {/* Vendor Follow-up Banner */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-primary-100 dark:border-primary-800/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-xl">
              <Mail size={24} className="text-primary-600" />
            </div>
            <div>
              <h4 className="font-bold text-primary-800 dark:text-primary-300 mb-1">Automated Vendor Follow-up</h4>
              <p className="text-sm text-primary-700/80 dark:text-primary-400/80 max-w-xl">
                We found <strong>{stats.missingPortal} invoices</strong> missing in the GST Portal from {stats.missingPortal} suppliers. 
                Send automated email reminders to upload their data so you can claim ITC.
              </p>
            </div>
          </div>
          <button className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2 whitespace-nowrap">
            <Mail size={16} /> Email Vendors
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <DollarSign size={18} className="text-slate-400" /> Tax Summary
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-400">Total Portal Tax</span>
              <span className="font-bold text-slate-800 dark:text-white">{stats.totalPortalTax}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-400">Total Books Tax</span>
              <span className="font-bold text-slate-800 dark:text-white">{stats.totalBooksTax}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Net Difference</span>
              <span className="font-bold text-red-600">{stats.totalDiff} unreconciled</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <FileCheck size={18} className="text-slate-400" /> ITC Claim Summary
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-400">Eligible ITC (Matched)</span>
              <span className="font-bold text-emerald-600">₹14.2L</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-400">Disputed ITC</span>
              <span className="font-bold text-red-600">₹0.7L</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Pending ITC (Missing)</span>
              <span className="font-bold text-amber-600">₹4.0L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reconciliation;

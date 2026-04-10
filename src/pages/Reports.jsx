import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, MoreVertical, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const reportsList = [
    { id: 'REP-1049', platform: 'Amazon', month: 'Feb 2024', file: 'amazon_feb_2024.zip', records: 1245, status: 'Pending', type: 'warning' },
    { id: 'REP-1048', platform: 'Meesho', month: 'Jan 2024', file: 'meesho_jan_2024.xlsx', records: 832, status: 'Filed', type: 'success' },
    { id: 'REP-1047', platform: 'Flipkart', month: 'Jan 2024', file: 'flipkart_q4_2023.zip', records: 2104, status: 'Error', type: 'error' },
    { id: 'REP-1046', platform: 'Amazon', month: 'Dec 2023', file: 'amazon_dec_2023.zip', records: 3410, status: 'Filed', type: 'success' },
    { id: 'REP-1045', platform: 'Amazon', month: 'Nov 2023', file: 'amazon_nov_2023.zip', records: 2980, status: 'Filed', type: 'success' },
    { id: 'REP-1044', platform: 'Meesho', month: 'Nov 2023', file: 'meesho_nov_2023.xlsx', records: 651, status: 'Filed', type: 'success' },
    { id: 'REP-1043', platform: 'Flipkart', month: 'Nov 2023', file: 'flipkart_nov_2023.zip', records: 1540, status: 'Filed', type: 'success' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Reports</h2>
          <p className="text-slate-500 dark:text-slate-400">View and manage all your processed GST reports in one place.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download size={18} /> Export List
          </button>
        </div>
      </div>

      <div className="card">
        {/* Filters Panel */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="input-field pl-10 h-10 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <select className="input-field h-10 py-1 w-full sm:w-auto">
              <option>All Platforms</option>
              <option>Amazon</option>
              <option>Flipkart</option>
              <option>Meesho</option>
            </select>
            <select className="input-field h-10 py-1 w-full sm:w-auto">
              <option>All Status</option>
              <option>Filed</option>
              <option>Pending</option>
              <option>Error</option>
            </select>
            <button className="btn-secondary px-3 flex items-center justify-center">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 text-sm">
                <th className="py-4 px-6 font-medium">Report ID</th>
                <th className="py-4 px-6 font-medium">Platform</th>
                <th className="py-4 px-6 font-medium">Period</th>
                <th className="py-4 px-6 font-medium">Records</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportsList.map((report) => (
                <tr key={report.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6 font-medium">
                    <Link to={`/app/reports/${report.id}`} className="text-primary-600 hover:text-primary-700 hover:underline">
                      {report.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                       <span className="font-medium text-slate-800 dark:text-slate-200">{report.platform}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{report.month}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{report.records.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                      ${report.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' : 
                        report.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                        'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50'}
                    `}>
                      {report.type === 'warning' && <Clock size={12} />}
                      {report.type === 'success' && <CheckCircle size={12} />}
                      {report.type === 'error' && <AlertCircle size={12} />}
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary-600 bg-slate-50 hover:bg-primary-50 dark:bg-slate-800 dark:hover:bg-primary-900/30 rounded transition-colors tooltip-trigger relative group">
                        <Download size={16} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">Download JSON</span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-50 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Setup */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
           <span>Showing 1 to 7 of 24 reports</span>
           <div className="flex gap-1">
             <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>Prev</button>
             <button className="px-3 py-1 bg-primary-600 text-white rounded">1</button>
             <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
             <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">3</button>
             <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

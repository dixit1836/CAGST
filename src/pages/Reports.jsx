import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Download, MoreVertical, FileText, CheckCircle, Clock, AlertCircle, Eye, Trash2, RefreshCw, Calendar, ChevronDown, X } from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const reportsList = [
    { id: 'REP-1049', platform: 'Amazon', month: 'Feb 2024', file: 'amazon_feb_2024.zip', records: 1245, status: 'Pending', type: 'warning', date: '2024-02-10' },
    { id: 'REP-1048', platform: 'Meesho', month: 'Jan 2024', file: 'meesho_jan_2024.xlsx', records: 832, status: 'Filed', type: 'success', date: '2024-01-28' },
    { id: 'REP-1047', platform: 'Flipkart', month: 'Jan 2024', file: 'flipkart_q4_2023.zip', records: 2104, status: 'Error', type: 'error', date: '2024-01-15' },
    { id: 'REP-1046', platform: 'Amazon', month: 'Dec 2023', file: 'amazon_dec_2023.zip', records: 3410, status: 'Filed', type: 'success', date: '2023-12-28' },
    { id: 'REP-1045', platform: 'Amazon', month: 'Nov 2023', file: 'amazon_nov_2023.zip', records: 2980, status: 'Filed', type: 'success', date: '2023-11-30' },
    { id: 'REP-1044', platform: 'Meesho', month: 'Nov 2023', file: 'meesho_nov_2023.xlsx', records: 651, status: 'Filed', type: 'success', date: '2023-11-25' },
    { id: 'REP-1043', platform: 'Flipkart', month: 'Nov 2023', file: 'flipkart_nov_2023.zip', records: 1540, status: 'Filed', type: 'success', date: '2023-11-20' },
    { id: 'REP-1042', platform: 'Myntra', month: 'Oct 2023', file: 'myntra_oct_2023.xlsx', records: 428, status: 'Processing', type: 'info', date: '2023-10-31' },
  ];

  const filteredReports = reportsList.filter(report => {
    const matchesSearch = report.file.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || report.platform.toLowerCase() === platformFilter;
    const matchesStatus = statusFilter === 'all' || report.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredReports.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredReports.map(r => r.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPlatformFilter('all');
    setStatusFilter('all');
  };

  const hasActiveFilters = searchTerm || platformFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Reports</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage and track all your processed GST reports.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={16} /> Export All
          </button>
          <Link to="/app/upload" className="btn-primary flex items-center gap-2 text-sm">
            <FileText size={16} /> Upload Report
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: '48', color: 'blue' },
          { label: 'Filed Successfully', value: '42', color: 'emerald' },
          { label: 'Pending Review', value: '4', color: 'amber' },
          { label: 'Errors', value: '2', color: 'red' },
        ].map((stat, i) => (
          <div key={i} className={`card p-4 border-l-4 border-l-${stat.color}-500`}>
            <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="card">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by filename or ID..." 
                className="input-field pl-10 h-10 py-1 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary px-3 py-2 text-sm flex items-center gap-2 ${showFilters ? 'bg-primary-50 border-primary-300 text-primary-700' : ''}`}
              >
                <Filter size={16} /> Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                )}
              </button>
              
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="text-xs text-slate-500 hover:text-red-500 flex items-center gap-1"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Platform</label>
                <select 
                  className="input-field h-9 py-1 text-sm"
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                >
                  <option value="all">All Platforms</option>
                  <option value="amazon">Amazon</option>
                  <option value="flipkart">Flipkart</option>
                  <option value="meesho">Meesho</option>
                  <option value="myntra">Myntra</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                <select 
                  className="input-field h-9 py-1 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="filed">Filed</option>
                  <option value="pending">Pending</option>
                  <option value="error">Error</option>
                  <option value="processing">Processing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">From Date</label>
                <input type="date" className="input-field h-9 py-1 text-sm" />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">To Date</label>
                <input type="date" className="input-field h-9 py-1 text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="p-3 bg-primary-50 dark:bg-primary-900/20 border-b border-primary-100 dark:border-primary-900/30 flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {selectedRows.length} report{selectedRows.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button className="text-xs text-primary-600 hover:underline">Download JSON</button>
              <button className="text-xs text-red-600 hover:underline">Delete Selected</button>
              <button onClick={() => setSelectedRows([])} className="text-xs text-slate-500 hover:underline">Clear Selection</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 text-xs">
                <th className="py-3 px-4 font-semibold w-10">
                  <input 
                    type="checkbox"
                    checked={selectedRows.length === filteredReports.length && filteredReports.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                </th>
                <th className="py-3 px-4 font-semibold">Report ID</th>
                <th className="py-3 px-4 font-semibold">Platform</th>
                <th className="py-3 px-4 font-semibold">Period</th>
                <th className="py-3 px-4 font-semibold">Records</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className={`border-b border-slate-50 dark:border-slate-800/50 transition-colors ${
                  selectedRows.includes(report.id) ? 'bg-primary-50/50 dark:bg-primary-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}>
                  <td className="py-3 px-4">
                    <input 
                      type="checkbox"
                      checked={selectedRows.includes(report.id)}
                      onChange={() => toggleSelect(report.id)}
                      className="w-4 h-4 rounded border-slate-300"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/app/reports/${report.id}`} className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
                      {report.id}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white
                        ${report.platform === 'Amazon' ? 'bg-amber-500' : 
                          report.platform === 'Flipkart' ? 'bg-blue-600' : 
                          report.platform === 'Meesho' ? 'bg-pink-500' : 'bg-indigo-500'}`}>
                        {report.platform.substring(0,2).toUpperCase()}
                      </div>
                      <span className="font-medium text-sm">{report.platform}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                      <Calendar size={14} className="text-slate-400" />
                      {report.month}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">
                    {report.records.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border
                      ${report.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' : 
                        report.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                        report.type === 'error' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50' :
                        'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/50'}`}>
                      {report.type === 'warning' && <Clock size={10} />}
                      {report.type === 'success' && <CheckCircle size={10} />}
                      {report.type === 'error' && <AlertCircle size={10} />}
                      {report.status === 'Processing' && <RefreshCw size={10} className="animate-spin" />}
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link 
                        to={`/app/reports/${report.id}`}
                        className="p-1.5 text-slate-400 hover:text-primary-600 bg-slate-50 hover:bg-primary-50 dark:bg-slate-800 dark:hover:bg-primary-900/30 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </Link>
                      <button 
                        className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded transition-colors"
                        title="Download JSON"
                      >
                        <Download size={14} />
                      </button>
                      <button 
                        className="p-1.5 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-900/30 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="p-12 text-center">
            <FileText size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="font-medium text-slate-700 dark:text-slate-300 mb-1">No reports found</h3>
            <p className="text-sm text-slate-500">Try adjusting your search or filters.</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="mt-4 text-primary-600 hover:underline text-sm">
                Clear all filters
              </button>
            )}
          </div>
        )}
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
          <span className="text-slate-500">Showing {filteredReports.length} of {reportsList.length} reports</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
              <ChevronDown className="rotate-90" size={14} />
            </button>
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1.5 bg-primary-600 text-white rounded">1</button>
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">3</button>
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
              <ChevronDown className="-rotate-90" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

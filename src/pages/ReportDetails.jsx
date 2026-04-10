import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Trash2, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';

const ReportDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('data');

  // Hardcoded mock data for the specific report
  const report = {
    id: id || 'REP-1049',
    platform: 'Amazon',
    month: 'February 2024',
    uploadDate: 'Feb 10, 2024 • 10:24 AM',
    file: 'amazon_feb_2024.zip',
    size: '8.4 MB',
    records: 1245,
    status: 'Pending Verification',
    taxAmount: '₹14,52,430',
    breakdown: {
      b2b: 245,
      b2c: 1000,
      exempt: 0
    },
    stats: {
      valid: 1243,
      flagged: 2,
      processed: '100%'
    }
  };

  const sampleData = [
    { orderId: 'AMZ-993-8472', customer: 'Rahul Sharma', gstin: '27AAPCU1294G1Z9', total: '₹4,120', tax: '₹741.60', status: 'Valid' },
    { orderId: 'AMZ-993-8473', customer: 'Priya Patel', gstin: 'Unregistered', total: '₹1,500', tax: '₹270.00', status: 'Valid' },
    { orderId: 'AMZ-993-8474', customer: 'Amit Gupta', gstin: '08BUPPT2344B1Z!', total: '₹8,490', tax: '₹1,528.20', status: 'Flagged' },
    { orderId: 'AMZ-993-8475', customer: 'Suresh Kumar', gstin: '29AABCU9603R1ZX', total: '₹0.00', tax: '₹0.00', status: 'Flagged' },
    { orderId: 'AMZ-993-8476', customer: 'Vikram Singh', gstin: '07AAACU1234A1Z5', total: '₹12,400', tax: '₹2,232.20', status: 'Valid' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/app/reports" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{report.id}</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50 text-xs font-medium">
                {report.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Processed from {report.file}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2 px-3 py-2 text-sm">
            <Share2 size={16} /> Share
          </button>
          <button className="btn-secondary flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 border-red-100">
            <Trash2 size={16} /> Delete
          </button>
          <Link to="/app/verification" className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
             Verify Batch
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Platform</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs">
              AZ
            </div>
            <span className="font-semibold">{report.platform}</span>
          </div>
        </div>
        <div className="card p-5">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Classification</p>
          <div className="flex gap-2">
            <div className="flex-1 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
               <p className="text-[10px] font-bold text-indigo-600 uppercase">B2B</p>
               <p className="font-bold text-lg">{report.breakdown.b2b}</p>
            </div>
            <div className="flex-1 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
               <p className="text-[10px] font-bold text-emerald-600 uppercase">B2C</p>
               <p className="font-bold text-lg">{report.breakdown.b2c}</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Tax Value</p>
          <p className="font-semibold text-lg text-primary-600 dark:text-primary-400">{report.taxAmount}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Completion</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-primary-500 w-full"></div>
            </div>
            <span className="font-semibold text-sm">100%</span>
          </div>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Statistics & Metadata */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText size={18} className="text-primary-600" /> Batch Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Total Records</span>
                <span className="font-medium">{report.records}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Successfully Parsed</span>
                <span className="text-emerald-600 font-medium">{report.stats.valid}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Flagged Anomalies</span>
                <span className="text-red-600 font-medium">{report.stats.flagged}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="w-full btn-secondary flex items-center justify-center gap-2 text-sm">
                  <Download size={16} /> Download Full Logs
                </button>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Clock size={18} className="text-primary-600" /> Processing Timeline
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
              <div className="relative pl-8">
                 <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-primary-500 border-4 border-white dark:border-dark-card shadow-sm"></div>
                 <p className="text-sm font-semibold">Report Uploaded</p>
                 <p className="text-xs text-slate-500">{report.uploadDate}</p>
              </div>
              <div className="relative pl-8">
                 <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-primary-500 border-4 border-white dark:border-dark-card shadow-sm"></div>
                 <p className="text-sm font-semibold">JSON Conversion Complete</p>
                 <p className="text-xs text-slate-500">Feb 10, 2024 • 10:25 AM</p>
              </div>
              <div className="relative pl-8">
                 <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-dark-card shadow-sm"></div>
                 <p className="text-sm font-semibold text-slate-400">Waiting for Verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Preview */}
        <div className="lg:col-span-2 card flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('data')}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'data' ? 'bg-white dark:bg-dark-card shadow text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Data Preview
              </button>
              <button 
                onClick={() => setActiveTab('json')}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'json' ? 'bg-white dark:bg-dark-card shadow text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Raw JSON
              </button>
            </div>
            <div className="flex gap-2">
               <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                  <Search size={16} />
               </button>
               <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                  <Filter size={16} />
               </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {activeTab === 'data' ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">GSTIN</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4 text-right">Tax</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3 px-4 font-medium">{row.orderId}</td>
                      <td className="py-3 px-4 text-slate-500">{row.gstin}</td>
                      <td className="py-3 px-4 text-right">{row.total}</td>
                      <td className="py-3 px-4 text-right">{row.tax}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.status === 'Valid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                          {row.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4 font-mono text-[11px] bg-slate-900 text-slate-300 h-full overflow-auto">
                <pre>{JSON.stringify({
                  "metadata": {
                    "platform": "Amazon",
                    "period": "Feb 2024",
                    "gstin": "27AAPCU1294G1Z9"
                  },
                  "b2b_data": [
                    {
                      "ctin": "27AAACD1234A1Z1",
                      "inv": [
                        {
                          "inum": "AMZ-2024-883",
                          "idt": "10-02-2024",
                          "val": 4120.00,
                          "pos": "27",
                          "rchrg": "N",
                          "inv_typ": "R",
                          "itms": [{ "num": 1, "itm_det": { "rt": 18, "iamt": 741.60 } }]
                        }
                      ]
                    }
                  ],
                  "b2cs_data": [
                    {
                      "sply_ty": "INTER",
                      "pos": "07",
                      "rt": 18,
                      "iamt": 270.00,
                      "txval": 1500.00
                    }
                  ]
                }, null, 2)}</pre>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 text-center">
             <Link to="/app/verification" className="text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center justify-center gap-1 group">
               View All 1,245 Records <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;

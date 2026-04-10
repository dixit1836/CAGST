import { 
  FileText, 
  Upload as UploadIcon, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  AlertCircle,
  RefreshCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { title: "Reports Uploaded", value: "124", icon: <UploadIcon className="text-blue-500" />, trend: "+12%" },
    { title: "API Sync Status", value: "Active", icon: <RefreshCcw className="text-emerald-500" />, trend: "Syncing" },
    { title: "Pending Verifications", value: "8", icon: <Clock className="text-amber-500" />, trend: "-2" },
    { title: "Approved Filings", value: "112", icon: <CheckCircle className="text-emerald-500" />, trend: "+5%" },
    { title: "Total Tax Assessed", value: "₹4.2L", icon: <TrendingUp className="text-purple-500" />, trend: "+1.2L" }
  ];

  const recentActivity = [
    { id: 1, platform: 'Amazon', file: 'amazon_feb_2024.zip', status: 'Pending Verification', time: '10 mins ago', type: 'warning' },
    { id: 2, platform: 'Meesho', file: 'meesho_jan_2024.xlsx', status: 'Approved & Filed', time: '2 hours ago', type: 'success' },
    { id: 3, platform: 'Flipkart', file: 'flipkart_q4_2023.zip', status: 'Data Error', time: '1 day ago', type: 'error' },
    { id: 4, platform: 'Amazon', file: 'amazon_dec_2023.zip', status: 'Approved & Filed', time: '3 days ago', type: 'success' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-slate-400">Welcome back! Here's what's happening with your GST filings.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/app/reports" className="btn-secondary">View Reports</Link>
          <Link to="/app/upload" className="btn-primary flex items-center gap-2">
            <UploadIcon size={18} /> Upload Report
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="card p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                {stat.icon}
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full 
                ${stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}
              `}>
                {stat.trend}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stat.value}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Processing Activity</h3>
          <Link to="/app/reports" className="text-primary-600 hover:text-primary-700 text-sm font-medium">View all</Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                <th className="pb-3 px-4 font-medium">Platform</th>
                <th className="pb-3 px-4 font-medium">File Name</th>
                <th className="pb-3 px-4 font-medium">Status</th>
                <th className="pb-3 px-4 font-medium">Time</th>
                <th className="pb-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map(item => (
                <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300">
                        {item.platform.substring(0,2).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{item.platform}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" />
                    {item.file}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                      ${item.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' : 
                        item.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                        'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50'}
                    `}>
                      {item.type === 'warning' && <Clock size={12} />}
                      {item.type === 'success' && <CheckCircle size={12} />}
                      {item.type === 'error' && <AlertCircle size={12} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-500 dark:text-slate-400">{item.time}</td>
                  <td className="py-4 px-4 text-right">
                    {item.type === 'warning' ? (
                       <Link to="/app/verification" className="text-primary-600 hover:text-primary-700 font-medium text-sm">Verify Now</Link>
                    ) : item.type === 'error' ? (
                       <button className="text-red-600 hover:text-red-700 font-medium text-sm">Fix Data</button>
                    ) : (
                       <button className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-sm">View Details</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { 
  FileText, 
  Upload as UploadIcon, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  AlertCircle,
  RefreshCcw,
  ArrowUpRight,
  DollarSign,
  FileCheck,
  ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { title: "Total Reports", value: "124", icon: <FileText className="text-blue-500" />, trend: "+12%", trendUp: true },
    { title: "Pending Filings", value: "8", icon: <Clock className="text-amber-500" />, trend: "-2", trendUp: false },
    { title: "Errors Found", value: "3", icon: <AlertCircle className="text-red-500" />, trend: "-5", trendUp: false },
    { title: "Completed Returns", value: "112", icon: <CheckCircle className="text-emerald-500" />, trend: "+5%", trendUp: true },
    { title: "Total Tax Assessed", value: "₹4.2L", icon: <TrendingUp className="text-purple-500" />, trend: "+₹1.2L", trendUp: true },
    { title: "ITC Claimed", value: "₹2.8L", icon: <DollarSign className="text-indigo-500" />, trend: "+₹0.5L", trendUp: true }
  ];

  const recentActivity = [
    { id: 1, platform: 'Amazon', file: 'amazon_feb_2024.zip', status: 'Pending Verification', time: '10 mins ago', type: 'warning' },
    { id: 2, platform: 'Meesho', file: 'meesho_jan_2024.xlsx', status: 'Approved & Filed', time: '2 hours ago', type: 'success' },
    { id: 3, platform: 'Flipkart', file: 'flipkart_q4_2023.zip', status: 'Data Error', time: '1 day ago', type: 'error' },
    { id: 4, platform: 'Amazon', file: 'amazon_dec_2023.zip', status: 'Approved & Filed', time: '3 days ago', type: 'success' },
    { id: 5, platform: 'Meesho', file: 'meesho_dec_2023.xlsx', status: 'Processing', time: '4 days ago', type: 'info' },
  ];

  const monthlyData = [
    { name: 'Sep', gstr1: 4.2, gstr3b: 3.8, tcsgst: 0.4 },
    { name: 'Oct', gstr1: 4.8, gstr3b: 4.5, tcsgst: 0.3 },
    { name: 'Nov', gstr1: 5.1, gstr3b: 4.9, tcsgst: 0.2 },
    { name: 'Dec', gstr1: 6.2, gstr3b: 5.8, tcsgst: 0.4 },
    { name: 'Jan', gstr1: 5.8, gstr3b: 5.4, tcsgst: 0.4 },
    { name: 'Feb', gstr1: 6.5, gstr3b: 6.1, tcsgst: 0.4 },
  ];

  const platformData = [
    { name: 'Amazon', value: 45, color: '#f59e0b' },
    { name: 'Flipkart', value: 30, color: '#3b82f6' },
    { name: 'Meesho', value: 15, color: '#ec4899' },
    { name: 'Others', value: 10, color: '#6b7280' },
  ];

  const filingStatus = [
    { name: 'Filed', count: 112, fill: '#10b981' },
    { name: 'Pending', count: 8, fill: '#f59e0b' },
    { name: 'Error', count: 3, fill: '#ef4444' },
    { name: 'Processing', count: 1, fill: '#6366f1' },
  ];

  const quickActions = [
    { title: 'Upload Report', icon: <UploadIcon size={20} />, link: '/app/upload', color: 'blue' },
    { title: 'Verify Data', icon: <FileCheck size={20} />, link: '/app/verification', color: 'emerald' },
    { title: 'Reconcile', icon: <RefreshCcw size={20} />, link: '/app/reconciliation', color: 'purple' },
    { title: 'File GST', icon: <CheckCircle size={20} />, link: '/app/gst-portal', color: 'amber' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-slate-400">Welcome back! Here's your GST filing summary.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/app/reports" className="btn-secondary text-sm">View Reports</Link>
          <Link to="/app/upload" className="btn-primary flex items-center gap-2 text-sm">
            <UploadIcon size={16} /> Upload Report
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                {stat.icon}
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1
                ${stat.trendUp ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {stat.trendUp ? <ArrowUpRight size={10} /> : <ArrowDown size={10} />}
                {stat.trend}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <Link 
            key={i} 
            to={action.link}
            className={`card p-4 flex items-center gap-4 hover:shadow-md transition-all group cursor-pointer
              ${action.color === 'blue' ? 'hover:border-blue-300' : 
                action.color === 'emerald' ? 'hover:border-emerald-300' : 
                action.color === 'purple' ? 'hover:border-purple-300' : 'hover:border-amber-300'}`}
          >
            <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform
              ${action.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 
                action.color === 'emerald' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 
                action.color === 'purple' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' : 
                'bg-amber-100 text-amber-600 dark:bg-amber-900/30'}`}>
              {action.icon}
            </div>
            <span className="font-medium text-sm text-slate-700 dark:text-slate-200">{action.title}</span>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* GST Summary Chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Monthly GST Summary (₹ Lakhs)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">GSTR-1 vs GSTR-3B comparison</p>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>GSTR-1</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>GSTR-3B</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="gstr1" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="gstr3b" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Platform Distribution</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Sales by marketplace</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {platformData.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                <span className="font-bold text-slate-800 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filing Status & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Filing Status */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Filing Status</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Current month breakdown</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filingStatus} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {filingStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Processing Activity</h3>
              <Link to="/app/reports" className="text-primary-600 hover:text-primary-700 text-sm font-medium">View all</Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 text-xs">
                  <th className="py-3 px-4 font-semibold">Platform</th>
                  <th className="py-3 px-4 font-semibold">File</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Time</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map(item => (
                  <tr key={item.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white
                          ${item.platform === 'Amazon' ? 'bg-amber-500' : 
                            item.platform === 'Flipkart' ? 'bg-blue-600' : 'bg-pink-500'}`}>
                          {item.platform.substring(0,2).toUpperCase()}
                        </div>
                        <span className="font-medium text-sm">{item.platform}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300 max-w-[150px] truncate">
                      {item.file}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold border
                        ${item.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' : 
                          item.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                          item.type === 'error' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50' :
                          'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/50'}`}>
                        {item.type === 'warning' && <Clock size={10} />}
                        {item.type === 'success' && <CheckCircle size={10} />}
                        {item.type === 'error' && <AlertCircle size={10} />}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400">{item.time}</td>
                    <td className="py-3 px-4 text-right">
                      {item.type === 'warning' ? (
                        <Link to="/app/verification" className="text-primary-600 hover:text-primary-700 font-medium text-xs">Verify</Link>
                      ) : item.type === 'error' ? (
                        <button className="text-red-600 hover:text-red-700 font-medium text-xs">Fix</button>
                      ) : (
                        <button className="text-slate-500 hover:text-slate-700 font-medium text-xs">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

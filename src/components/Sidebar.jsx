import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  CheckCircle, 
  Globe2, 
  Link2 as LinkIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  Database,
  ArrowLeftRight,
  Users,
  FileBox
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navigation = [
    {
      title: 'Marketplace',
      items: [
        { path: '/app/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/app/upload', icon: <Upload size={20} />, label: 'Upload Reports' },
        { path: '/app/integrations', icon: <LinkIcon size={20} />, label: 'API Sync' },
        { path: '/app/reports', icon: <FileText size={20} />, label: 'My Reports' },
      ]
    },
    {
      title: 'Accounting',
      items: [
        { path: '/app/invoices', icon: <FileBox size={20} />, label: 'Invoices' },
        { path: '/app/bank-ai', icon: <BrainCircuit size={20} />, label: 'Bank Statement AI' },
        { path: '/app/tally-export', icon: <Database size={20} />, label: 'Tally Export' },
      ]
    },
    {
      title: 'Compliance',
      items: [
        { path: '/app/reconciliation', icon: <ArrowLeftRight size={20} />, label: 'Reconciliation' },
        { path: '/app/gst-portal', icon: <Globe2 size={20} />, label: 'GST Portal Sync' },
        { path: '/app/verification', icon: <CheckCircle size={20} />, label: 'Verification' },
      ]
    },
    {
      title: 'Administration',
      items: [
        { path: '/app/clients', icon: <Users size={20} />, label: 'Client Management' },
        { path: '/app/team', icon: <Users size={20} />, label: 'Team Roles' },
        { path: '/app/settings', icon: <Settings size={20} />, label: 'System Settings' },
      ]
    }
  ];

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-white dark:bg-dark-card border-r border-slate-200 dark:border-dark-border transition-all duration-300 shadow-sm z-20 flex flex-col
      ${isOpen ? 'w-64' : 'w-20'}`}>
      
      {/* Sidebar Header */}
      <div className="h-[73px] flex items-center justify-between px-4 border-b border-slate-200 dark:border-dark-border">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">
              G
            </div>
            <span className="font-bold text-lg dark:text-white">GST<span className="text-primary-600">Sync</span></span>
          </div>
        )}
        {!isOpen && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">
            G
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-full p-1 text-slate-500 hover:text-primary-600 shadow-sm z-30"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Nav Menu */}
      <nav className="flex-1 py-6 px-3 space-y-8 overflow-y-auto no-scrollbar">
        {navigation.map((group, idx) => (
          <div key={idx} className="space-y-2">
            {isOpen && (
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                {group.title}
              </h3>
            )}
            {!isOpen && <div className="h-px bg-slate-100 dark:bg-slate-800 mx-2 mb-4"></div>}
            
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative
                      ${isActive 
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 font-bold shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                  >
                    <div className={`${!isOpen && 'mx-auto'}`}>
                      {item.icon}
                    </div>
                    {isOpen && <span className="text-sm">{item.label}</span>}
                    
                    {!isOpen && (
                      <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Settings / Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-dark-border">
        <Link to="/app/settings" className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
          <Settings size={20} className={`${!isOpen && 'mx-auto'}`} />
          {isOpen && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

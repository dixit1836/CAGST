import { Bell, Search, Sun, Moon, User, ChevronDown, Building2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const location = useLocation();
  
  // Create a readable title from pathname
  const path = location.pathname.split('/').pop() || 'Dashboard';
  const title = path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');

  return (
    <header className="h-[73px] bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-slate-200 dark:border-dark-border px-6 flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
      
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h1>
        
        {/* GSTIN Switcher (ProGST Style) */}
        <div className="hidden lg:flex items-center gap-2 pl-6 border-l border-slate-200 dark:border-slate-800">
           <div className="p-1.5 bg-primary-100 dark:bg-primary-900/30 rounded text-primary-600">
              <Building2 size={16} />
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none mb-1">Active Entity</span>
              <button className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary-600 transition-colors group">
                 User Store (27AAP...G1Z9) <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary-500 w-64 outline-none text-slate-700 dark:text-slate-200 transition-all"
          />
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-dark-card rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="pl-4 border-l border-slate-200 dark:border-dark-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 flex flex-center items-center justify-center font-medium shadow-sm">
            US
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-slate-700 dark:text-slate-200">User Store</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Seller Account</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;

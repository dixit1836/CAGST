import { useState } from 'react';
import { 
  FileCode, 
  Download, 
  CheckCircle, 
  RefreshCw, 
  Database,
  Info,
  ChevronRight,
  Zap
} from 'lucide-react';

const TallyExport = () => {
  const [platform, setPlatform] = useState('all');
  const [format, setFormat] = useState('xml');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Database className="text-primary-600" /> Accounting Export (Tally)
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Export your e-commerce sales and purchase data to Tally or ERP.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Export Configuration */}
        <div className="card p-8">
           <h3 className="text-lg font-bold mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">Export Settings</h3>
           
           <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Target Platform</label>
                <select className="input-field" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                  <option value="all">All Marketplaces</option>
                  <option value="amazon">Amazon (Direct XML)</option>
                  <option value="flipkart">Flipkart (Direct XML)</option>
                  <option value="meesho">Meesho (Direct XML)</option>
                  <option value="miracle">Miracle Software</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className="input-field py-1.5" defaultValue="2024-02-01" />
                  <input type="date" className="input-field py-1.5" defaultValue="2024-02-29" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Export Format</label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <button onClick={() => setFormat('xml')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${format === 'xml' ? 'bg-white dark:bg-dark-card shadow text-primary-600' : 'text-slate-500'}`}>TALLY XML</button>
                  <button onClick={() => setFormat('excel')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${format === 'excel' ? 'bg-white dark:bg-dark-card shadow text-primary-600' : 'text-slate-500'}`}>EXCEL</button>
                  <button onClick={() => setFormat('json')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${format === 'json' ? 'bg-white dark:bg-dark-card shadow text-primary-600' : 'text-slate-500'}`}>JSON</button>
                </div>
              </div>

              <div className="pt-6">
                <button className="w-full btn-primary py-3 flex items-center justify-center gap-2 shadow-lg shadow-primary-600/30">
                  <Download size={18} /> Generate Accounting File
                </button>
              </div>
           </div>
        </div>

        {/* Info & AI Connector */}
        <div className="space-y-6">
          <div className="card p-6 border-l-4 border-l-emerald-500 bg-emerald-50/20 dark:bg-emerald-900/10">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 mb-2">
               <Zap className="fill-emerald-500 text-emerald-500" size={18} /> Smart AI Mapping
            </h4>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed mb-4">
               We automatically map Amazon/Flipkart SKU codes to your Tally Item names. No manual ledger creation needed.
            </p>
            <button className="text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-1 hover:underline">
               Configure Item Mapping <ChevronRight size={14} />
            </button>
          </div>

          <div className="card p-6">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-200">
               <Info size={18} className="text-primary-600" /> Tally Connector Status
            </h4>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <p className="text-sm font-medium">Auto-entry service is active</p>
            </div>
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
               <div className="flex justify-between text-xs">
                 <span className="text-slate-500">Last Sync</span>
                 <span className="font-semibold italic">10 mins ago</span>
               </div>
               <div className="flex justify-between text-xs">
                 <span className="text-slate-500">Vouchers Synced</span>
                 <span className="font-semibold">3,421</span>
               </div>
            </div>
            <button className="mt-4 w-full btn-secondary text-xs flex items-center justify-center gap-2">
              <RefreshCw size={14} /> Re-sync with Tally
            </button>
          </div>
        </div>

      </div>

      {/* Recents */}
      <div className="card mt-8">
         <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h4 className="font-bold">Recent Exports</h4>
            <button className="text-xs text-primary-600 font-bold">View History</button>
         </div>
         <div className="p-4 space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded text-primary-600">
                    <FileCode size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Tally_Export_Feb_2024_{i}.xml</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Generated: Feb 10, 2024</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 group-hover:text-primary-600 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default TallyExport;

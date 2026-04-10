import { useState } from 'react';
import { Upload as UploadIcon, FileUp, CheckCircle, AlertCircle, X, ChevronRight, Settings, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [platform, setPlatform] = useState('amazon'); // Default to Amazon as per user focus
  const [processingState, setProcessingState] = useState('idle');
  const navigate = useNavigate();

  const quickActions = [
    { title: 'Amazon Monthly', subtitle: 'MTR & B2B Reports', icon: 'AZ', color: 'orange' },
    { title: 'Meesho Settlement', subtitle: 'Weekly Statements', icon: 'MS', color: 'blue' },
    { title: 'Flipkart Sales', subtitle: 'Commission Invoices', icon: 'FK', color: 'indigo' },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setProcessingState('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      setProcessingState('success');
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Process E-commerce Data</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Select a quick action or upload your platform reports manually.</p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action, i) => (
          <button 
            key={i}
            onClick={() => setPlatform(action.id || 'amazon')}
            className={`card p-4 flex items-center gap-4 text-left hover:border-primary-500 transition-all group ${action.title === 'Amazon Monthly' ? 'border-primary-500 ring-2 ring-primary-500/10' : ''}`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-sm transition-transform group-hover:scale-110
              ${action.color === 'orange' ? 'bg-amber-500' : action.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'}
            `}>
              {action.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm">{action.title}</h4>
                {action.title === 'Amazon Monthly' && <span className="text-[8px] font-bold bg-primary-100 text-primary-700 px-1 rounded tracking-tighter">RECOMMENDED</span>}
              </div>
              <p className="text-[10px] text-slate-500">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Upload Column */}
        <div className="md:col-span-2 space-y-6">
          {/* API Sync Option */}
          <div className="card p-6 border-l-4 border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-800 rounded-xl">
                   <RefreshCcw className="text-emerald-600" size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-slate-800 dark:text-white">Quick API Sync</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400">Fetch latest data directly from connected stores.</p>
                </div>
              </div>
              <button 
                onClick={() => setProcessingState('processing')}
                className="btn-primary flex items-center gap-2 whitespace-nowrap bg-emerald-600 hover:bg-emerald-700"
              >
                Sync Now
              </button>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Select File</h3>
              {file && processingState === 'idle' && (
                <button 
                  onClick={() => setFile(null)}
                  className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-sm transition-colors"
                >
                  <X size={16} /> Clear
                </button>
              )}
            </div>

            {processingState === 'idle' && !file && (
              <div 
                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all bg-slate-50 dark:bg-slate-800/30
                  ${dragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-slate-300 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm mb-4">
                  <FileUp size={28} className="text-primary-500" />
                </div>
                <h4 className="font-medium text-lg mb-2">Drag & drop your file here</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm">
                  We accept ZIP (containing multiple reports) or Excel (.xlsx) files from any supported platform.
                </p>
                <label className="btn-secondary cursor-pointer">
                  Browse Files
                  <input type="file" className="hidden" accept=".zip,.xlsx,.xls,.csv" onChange={handleChange} />
                </label>
              </div>
            )}

            {file && processingState === 'idle' && (
              <div className="border rounded-xl p-6 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                  <FileUp size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 break-all">{file.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB • {file.name.split('.').pop().toUpperCase()}</p>
                </div>
              </div>
            )}

            {processingState === 'processing' && (
              <div className="border rounded-xl p-10 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-800/10 border-slate-200 dark:border-slate-700">
                <div className="w-16 h-16 mb-4 relative">
                  <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h4 className="font-medium text-lg mb-2">Extracting & Parsing Data...</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
                  Converting raw {file?.name.split('.').pop()} data into structured JSON format for GST validation.
                </p>
                
                {/* Simulated Progress bar */}
                <div className="w-full max-w-xs h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-6">
                  <div className="h-full bg-primary-500 rounded-full w-2/3 animate-pulse"></div>
                </div>
              </div>
            )}

            {processingState === 'success' && (
              <div className="border rounded-xl p-10 flex flex-col items-center justify-center text-center bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle size={32} />
                </div>
                <h4 className="font-medium text-lg text-emerald-800 dark:text-emerald-300 mb-2">Processing Complete!</h4>
                <p className="text-emerald-600 dark:text-emerald-400/80 text-sm max-w-sm mb-6">
                  Successfully extracted 3,421 records from the uploaded file and converted to structured JSON.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => navigate('/app/verification')} className="btn-primary">
                    Go to Verification
                  </button>
                  <button onClick={() => {setFile(null); setProcessingState('idle');}} className="btn-secondary">
                    Upload Another
                  </button>
                </div>
              </div>
            )}
          </div>

          {processingState === 'idle' && (
            <div className="flex justify-end">
              <button 
                onClick={handleUpload}
                disabled={!file}
                className={`btn-primary flex items-center gap-2 px-6 ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Process File <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Settings Column */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Settings size={18} className="text-slate-400" /> Options
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Platform</label>
                <select 
                  className="input-field" 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  disabled={processingState !== 'idle'}
                >
                  <option value="auto">Auto-detect from file</option>
                  <option value="amazon">Amazon India</option>
                  <option value="flipkart">Flipkart</option>
                  <option value="meesho">Meesho</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Month/Quarter</label>
                <input 
                  type="month" 
                  className="input-field"
                  disabled={processingState !== 'idle'} 
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" defaultChecked disabled={processingState !== 'idle'} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Strict Validation</strong>
                    Highlight any missing GSTINs or amount mismatches immediately.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Upload;

import { useState, useCallback } from 'react';
import { Upload as UploadIcon, FileUp, CheckCircle, AlertCircle, X, ChevronRight, Settings, RefreshCcw, FileText, Zap, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [platform, setPlatform] = useState('amazon');
  const [processingState, setProcessingState] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [processStep, setProcessStep] = useState(0);
  const navigate = useNavigate();

  const quickActions = [
    { id: 'amazon', title: 'Amazon Monthly', subtitle: 'MTR & B2B Reports', icon: 'AZ', color: 'orange' },
    { id: 'meesho', title: 'Meesho Settlement', subtitle: 'Weekly Statements', icon: 'MS', color: 'pink' },
    { id: 'flipkart', title: 'Flipkart Sales', subtitle: 'Commission Invoices', icon: 'FK', color: 'blue' },
  ];

  const processSteps = [
    { label: 'Extracting ZIP contents...', progress: 25 },
    { label: 'Parsing Excel data...', progress: 50 },
    { label: 'Validating GSTIN format...', progress: 70 },
    { label: 'Converting to JSON...', progress: 90 },
    { label: 'Finalizing records...', progress: 100 },
  ];

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (selectedFile) => {
    const validTypes = ['.zip', '.xlsx', '.xls', '.csv'];
    const ext = '.' + selectedFile.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(ext)) {
      alert('Please upload a valid file (.zip, .xlsx, .xls, .csv)');
      return;
    }
    
    if (selectedFile.size > 50 * 1024 * 1024) {
      alert('File size should be less than 50MB');
      return;
    }
    
    setFile(selectedFile);
    setProcessingState('idle');
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const simulateProcessing = () => {
    if (!file) return;
    setProcessingState('processing');
    setProgress(0);
    setProcessStep(0);

    let step = 0;
    const interval = setInterval(() => {
      if (step < processSteps.length) {
        setProcessStep(step);
        setProgress(processSteps[step].progress);
        step++;
      } else {
        clearInterval(interval);
        setProcessingState('success');
      }
    }, 600);
  };

  const handleReset = () => {
    setFile(null);
    setProcessingState('idle');
    setProgress(0);
    setProcessStep(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Upload E-commerce Reports</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Select a quick action or upload your platform reports manually.</p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action, i) => (
          <button 
            key={i}
            onClick={() => setPlatform(action.id)}
            className={`card p-4 flex items-center gap-4 text-left transition-all group ${
              platform === action.id 
                ? 'border-primary-500 ring-2 ring-primary-500/10 shadow-lg' 
                : 'hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shadow-sm transition-transform group-hover:scale-110
              ${action.color === 'orange' ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 
                action.color === 'pink' ? 'bg-gradient-to-br from-pink-400 to-pink-600' :
                'bg-gradient-to-br from-blue-400 to-blue-600'}`}>
              {action.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm">{action.title}</h4>
                {action.id === 'amazon' && (
                  <span className="text-[9px] font-bold bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded tracking-tight">POPULAR</span>
                )}
              </div>
              <p className="text-[10px] text-slate-500">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Upload Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* API Sync Banner */}
          <div className="card p-5 border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-800/50 rounded-xl">
                  <RefreshCcw className="text-emerald-600 dark:text-emerald-400" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Quick API Sync</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fetch latest data directly from connected stores.</p>
                </div>
              </div>
              <button className="btn-primary flex items-center gap-2 whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 text-sm py-2">
                <Zap size={14} /> Sync Now
              </button>
            </div>
          </div>

          {/* Main Upload Card */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FileText size={18} className="text-slate-400" />
                Select File to Upload
              </h3>
              {file && processingState === 'idle' && (
                <button 
                  onClick={handleReset}
                  className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-xs transition-colors"
                >
                  <X size={14} /> Remove
                </button>
              )}
            </div>

            {/* Idle State - Drop Zone */}
            {processingState === 'idle' && !file && (
              <div 
                className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-all bg-slate-50/50 dark:bg-slate-800/30
                  ${dragActive 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-[1.02]' 
                    : 'border-slate-300 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                  dragActive ? 'bg-primary-100 dark:bg-primary-900/40' : 'bg-slate-100 dark:bg-slate-800'
                }`}>
                  <FileUp size={28} className={`${dragActive ? 'text-primary-600' : 'text-slate-400'}`} />
                </div>
                <h4 className="font-semibold text-lg mb-2">
                  {dragActive ? 'Drop your file here!' : 'Drag & drop your file here'}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm">
                  Supports ZIP archives, Excel (.xlsx, .xls), and CSV files from Amazon, Flipkart, or Meesho.
                </p>
                <label className="btn-secondary cursor-pointer px-6 py-2.5">
                  Browse Files
                  <input type="file" className="hidden" accept=".zip,.xlsx,.xls,.csv" onChange={handleChange} />
                </label>
              </div>
            )}

            {/* File Selected State */}
            {file && processingState === 'idle' && (
              <div className="border rounded-xl p-5 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-800/50 border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                    file.name.endsWith('.zip') ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                    file.name.endsWith('.csv') ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                  }`}>
                    <FileUp size={26} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 dark:text-white truncate">{file.name}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="font-medium">{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span className="uppercase font-bold">{file.name.split('.').pop()}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle size={12} /> Ready to process
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Processing State */}
            {processingState === 'processing' && (
              <div className="border rounded-xl p-10 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mb-6 relative">
                    <Loader size={36} className="text-primary-600 animate-spin" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Processing your file...</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-6">
                    {processStep < processSteps.length ? processSteps[processStep].label : 'Finalizing...'}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-sm">
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                      <span>Progress</span>
                      <span className="font-bold text-primary-600">{progress}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-600 to-primary-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Step Indicators */}
                  <div className="flex gap-2 mt-6">
                    {processSteps.map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i < processStep ? 'bg-primary-500' :
                          i === processStep ? 'bg-primary-500 animate-pulse' :
                          'bg-slate-300 dark:bg-slate-600'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Success State */}
            {processingState === 'success' && (
              <div className="border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-8 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-900/20">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                    <CheckCircle size={40} className="text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-xl text-emerald-800 dark:text-emerald-300 mb-2">Processing Complete!</h4>
                  <p className="text-emerald-600 dark:text-emerald-400/80 text-sm max-w-sm mb-6">
                    Successfully extracted <strong>3,421 records</strong> from your {file?.name.split('.').pop().toUpperCase()} file and converted to structured JSON.
                  </p>
                  
                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-6">
                    <div className="bg-white dark:bg-dark-card rounded-lg p-3 border border-slate-100 dark:border-slate-800">
                      <div className="text-xl font-bold text-slate-800 dark:text-white">3,421</div>
                      <div className="text-[10px] text-slate-500">Total Records</div>
                    </div>
                    <div className="bg-white dark:bg-dark-card rounded-lg p-3 border border-emerald-100 dark:border-emerald-900/50">
                      <div className="text-xl font-bold text-emerald-600">3,419</div>
                      <div className="text-[10px] text-slate-500">Valid</div>
                    </div>
                    <div className="bg-white dark:bg-dark-card rounded-lg p-3 border border-red-100 dark:border-red-900/50">
                      <div className="text-xl font-bold text-red-600">2</div>
                      <div className="text-[10px] text-slate-500">Errors</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => navigate('/app/verification')} className="btn-primary px-6 py-2.5 flex items-center gap-2">
                      Go to Verification <ChevronRight size={16} />
                    </button>
                    <button onClick={handleReset} className="btn-secondary px-6 py-2.5">
                      Upload Another
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Process Button */}
            {processingState === 'idle' && file && (
              <div className="mt-5 flex justify-end">
                <button 
                  onClick={simulateProcessing}
                  disabled={!file}
                  className="btn-primary flex items-center gap-2 px-6 py-2.5"
                >
                  <UploadIcon size={16} /> Process File
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Options Column */}
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
              <Settings size={16} className="text-slate-400" /> Processing Options
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Platform</label>
                <select 
                  className="input-field text-sm" 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  disabled={processingState !== 'idle'}
                >
                  <option value="auto">Auto-detect</option>
                  <option value="amazon">Amazon India</option>
                  <option value="flipkart">Flipkart</option>
                  <option value="meesho">Meesho</option>
                  <option value="myntra">Myntra</option>
                  <option value="jiomart">JioMart</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Month / Quarter</label>
                <input 
                  type="month" 
                  className="input-field text-sm"
                  disabled={processingState !== 'idle'} 
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" defaultChecked disabled={processingState !== 'idle'} />
                  <div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">Strict Validation</span>
                    <span className="text-[11px] text-slate-500">Highlight GSTIN & amount errors</span>
                  </div>
                </label>
                
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" defaultChecked disabled={processingState !== 'idle'} />
                  <div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">Auto-Categorize B2B/B2C</span>
                    <span className="text-[11px] text-slate-500">Separate business & consumer sales</span>
                  </div>
                </label>
                
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" disabled={processingState !== 'idle'} />
                  <div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">Export to Tally</span>
                    <span className="text-[11px] text-slate-500">Generate Tally-compatible XML</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Help Card */}
          <div className="card p-5 bg-primary-50/50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900/30">
            <h4 className="font-semibold text-sm text-primary-800 dark:text-primary-300 mb-2">Need Help?</h4>
            <p className="text-xs text-primary-700/80 dark:text-primary-400/80 leading-relaxed mb-3">
              Not sure which report to download? Check our guide for each platform.
            </p>
            <button className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline">
              View Platform Guides →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;

import { useState } from 'react';
import { 
  ScanSearch, 
  Upload, 
  FileText, 
  CheckCircle, 
  Activity, 
  Download, 
  AlertCircle,
  X,
  FileSpreadsheet,
  BrainCircuit
} from 'lucide-react';

const BankAI = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const startAnalysis = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BrainCircuit className="text-primary-600" /> Bank Statement AI
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Upload PDF/CSV bank statements for AI-powered categorization and reconciliation.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Upload Column */}
        <div className="card p-8 flex flex-col justify-center items-center text-center">
            
            {!completed && !processing && (
              <>
                <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/10 rounded-full flex items-center justify-center mb-6">
                   <Upload className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Upload Statement</h3>
                <p className="text-sm text-slate-500 mb-8 max-w-xs">We support HDFC, ICICI, SBI and 20+ other major bank statements.</p>
                
                {file ? (
                   <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-6 border border-slate-200 dark:border-slate-700 flex items-center gap-4 text-left">
                      <FileText className="text-primary-500" />
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold text-sm truncate">{file.name}</p>
                        <p className="text-xs text-slate-500 uppercase">{Math.round(file.size/1024)} KB • PDF</p>
                      </div>
                      <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
                        <X size={18} />
                      </button>
                   </div>
                ) : (
                  <label className="w-full border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-10 hover:border-primary-500 hover:bg-primary-50/20 transition-all cursor-pointer mb-6 block">
                    <p className="text-sm font-bold text-slate-500">Click to browse or drag & drop</p>
                    <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                  </label>
                )}

                <button 
                  onClick={startAnalysis}
                  disabled={!file}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ScanSearch size={20} /> Analyze with AI
                </button>
              </>
            )}

            {processing && (
              <div className="py-12 flex flex-col items-center">
                <div className="relative w-24 h-24 mb-6">
                   <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <BrainCircuit size={32} className="text-primary-500 animate-pulse" />
                   </div>
                </div>
                <h4 className="text-xl font-bold mb-2">Analyzing Transactions...</h4>
                <p className="text-sm text-slate-500 px-10">Our AI is reading the entries, matching GST numbers and categorizing expenses.</p>
              </div>
            )}

            {completed && (
              <div className="py-8 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                   <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Analysis Ready</h3>
                <p className="text-sm text-slate-500 mb-8">We found 124 transactions and successfully matched 82 with your purchase invoices.</p>
                
                <div className="grid grid-cols-1 gap-3 w-full">
                  <button className="btn-primary py-3 flex items-center justify-center gap-2">
                    <FileSpreadsheet size={18} /> Download Excel Report
                  </button>
                  <button onClick={() => {setFile(null); setCompleted(false);}} className="btn-secondary py-3">
                    Upload Another
                  </button>
                </div>
              </div>
            )}
        </div>

        {/* Feature Highlights */}
        <div className="space-y-6">
          <div className="card p-6 border-t-4 border-t-primary-500 shadow-lg">
             <h4 className="font-bold mb-4 flex items-center gap-2">
               <Activity size={18} className="text-primary-600" /> Automated Bank Recon
             </h4>
             <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                   <CheckCircle size={14} className="text-emerald-500 mt-1 shrink-0" />
                   <p className="text-xs text-slate-600 dark:text-slate-400"><strong>Auto-Link:</strong> Matches bank debit entries with GST purchase invoices automatically.</p>
                </li>
                <li className="flex gap-3 items-start">
                   <CheckCircle size={14} className="text-emerald-500 mt-1 shrink-0" />
                   <p className="text-xs text-slate-600 dark:text-slate-400"><strong>GST Number Extract:</strong> Detects supplier GST numbers from transaction narration.</p>
                </li>
                <li className="flex gap-3 items-start">
                   <CheckCircle size={14} className="text-emerald-500 mt-1 shrink-0" />
                   <p className="text-xs text-slate-600 dark:text-slate-400"><strong>TDS/TCS Detection:</strong> Identifies statutory deductions and highlights them for accounting.</p>
                </li>
             </ul>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6">
             <div className="flex gap-3 mb-4">
               <AlertCircle className="text-primary-600" size={20} />
               <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Security Note</p>
             </div>
             <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
               Bank statements are processed in volatile memory and deleted immediately after analysis. We do not store your financial data beyond the session lifecycle.
             </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BankAI;

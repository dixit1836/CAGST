import { useState } from 'react';
import { 
  FileBox, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical,
  CheckCircle,
  FileCheck,
  Clock
} from 'lucide-react';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const invoicesList = [
    { id: 'INV-24-001', client: 'Acme Corp', date: '10 Feb 2024', amount: '₹14,500', tax: '₹2,610', status: 'Paid', filed: true },
    { id: 'INV-24-002', client: 'TechSolutions Ltd', date: '15 Feb 2024', amount: '₹8,200', tax: '₹1,476', status: 'Pending', filed: false },
    { id: 'INV-24-003', client: 'Global Logistics', date: '28 Feb 2024', amount: '₹25,000', tax: '₹4,500', status: 'Overdue', filed: false },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <FileBox className="text-primary-600" /> Invoice Generation
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Create GST-compliant invoices and file them directly.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <FileCheck size={18} /> File Selected (GST)
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} /> New Invoice
          </button>
        </div>
      </div>

      <div className="card">
        {/* Filters Panel */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="input-field pl-10 h-10 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="btn-secondary px-3 flex items-center justify-center">
              <Filter size={18} /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 text-sm">
                <th className="py-4 px-6 font-medium">
                   <input type="checkbox" className="rounded text-primary-600" />
                </th>
                <th className="py-4 px-6 font-medium">Invoice ID</th>
                <th className="py-4 px-6 font-medium">Client</th>
                <th className="py-4 px-6 font-medium">Date</th>
                <th className="py-4 px-6 font-medium text-right">Amount</th>
                <th className="py-4 px-6 font-medium text-right">Tax (GST)</th>
                <th className="py-4 px-6 font-medium text-center">Payment Status</th>
                <th className="py-4 px-6 font-medium text-center">GST Filed</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoicesList.map((invoice) => (
                <tr key={invoice.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                     <input type="checkbox" className="rounded text-primary-600" />
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200">{invoice.id}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">{invoice.client}</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-sm">{invoice.date}</td>
                  <td className="py-4 px-6 text-right text-slate-800 dark:text-slate-200 font-semibold">{invoice.amount}</td>
                  <td className="py-4 px-6 text-right text-slate-600 dark:text-slate-400">{invoice.tax}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border
                      ${invoice.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800/50' : 
                        invoice.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-800/50' : 
                        'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/50'}
                    `}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                     {invoice.filed ? (
                        <div className="flex justify-center text-emerald-500"><CheckCircle size={16} /></div>
                     ) : (
                        <div className="flex justify-center text-slate-300 dark:text-slate-600"><Clock size={16} /></div>
                     )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors tooltip-trigger relative group">
                         <Download size={16} />
                         <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">Download PDF</span>
                       </button>
                      <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
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

export default Invoices;

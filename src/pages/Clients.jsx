import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building 
} from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clientsList = [
    { id: 'C-001', name: 'Acme Corp', gstin: '27AAPCU1294G1Z9', email: 'contact@acme.com', phone: '+91 9876543210', status: 'Active' },
    { id: 'C-002', name: 'TechSolutions Ltd', gstin: '07BBBCD5678B1Z2', email: 'billing@techsol.in', phone: '+91 8765432109', status: 'Active' },
    { id: 'C-003', name: 'Global Logistics', gstin: '09AAACD9012C1Z3', email: 'accounts@globallogistics.com', phone: '+91 7654321098', status: 'Inactive' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="text-primary-600" /> Client Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Manage your clients for GST billing and filing.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Client
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
              placeholder="Search clients..." 
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
                <th className="py-4 px-6 font-medium">Client ID</th>
                <th className="py-4 px-6 font-medium">Business Name</th>
                <th className="py-4 px-6 font-medium">GSTIN</th>
                <th className="py-4 px-6 font-medium">Contact Details</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clientsList.map((client) => (
                <tr key={client.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200">{client.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                       <Building size={16} className="text-slate-400" />
                       <span className="font-medium text-slate-800 dark:text-slate-200">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-mono text-xs">{client.gstin}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Mail size={12} /> {client.email}</span>
                      <span className="flex items-center gap-1"><Phone size={12} /> {client.phone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border
                      ${client.status === 'Active' ? 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800/50' : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}
                    `}>
                      {client.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                      <MoreVertical size={16} />
                    </button>
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

export default Clients;

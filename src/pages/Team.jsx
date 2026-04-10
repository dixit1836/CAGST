import { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  MoreVertical, 
  Trash2, 
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const Team = () => {
  const [members] = useState([
    { id: 1, name: 'Amit Parmar', email: 'amit@example.com', role: 'Admin', status: 'Active', joined: 'Jan 15, 2024' },
    { id: 2, name: 'Sadhana Shah (CA)', email: 'ca.sadhana@audit.com', role: 'Tax Auditor', status: 'Active', joined: 'Feb 02, 2024' },
    { id: 3, name: 'Priya Mehta', email: 'priya@example.com', role: 'Accountant', status: 'Pending', joined: 'Feb 10, 2024' },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="text-primary-600" /> Team & Permissions
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Share access with your team members, CAs, and accountants.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-6 py-2.5">
          <UserPlus size={18} /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 flex items-center gap-4 border-l-4 border-l-primary-500">
           <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-xl text-primary-600">
              <Shield size={24} />
           </div>
           <div>
              <p className="text-sm font-bold">Role-Based Access</p>
              <p className="text-xs text-slate-500">Control what your staff can see.</p>
           </div>
        </div>
        <div className="card p-6 flex items-center gap-4 border-l-4 border-l-emerald-500">
           <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-emerald-600">
              <CheckCircle size={24} />
           </div>
           <div>
              <p className="text-sm font-bold">Multi-User Sync</p>
              <p className="text-xs text-slate-500">Real-time collaboration on filings.</p>
           </div>
        </div>
        <div className="card p-6 flex items-center gap-4 border-l-4 border-l-amber-500">
           <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-xl text-amber-600">
              <Clock size={24} />
           </div>
           <div>
              <p className="text-sm font-bold">Activity Logs</p>
              <p className="text-xs text-slate-500">Track every change and upload.</p>
           </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Member</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{member.name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><Mail size={10} /> {member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {member.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border
                      ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}
                    `}>
                      {member.status === 'Active' ? <CheckCircle size={10} /> : <Clock size={10} />}
                      {member.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500">{member.joined}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                        <MoreVertical size={18} />
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

export default Team;

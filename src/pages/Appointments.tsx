import { useState, useMemo, useRef, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { 
  ChevronDown, 
  Calendar, 
  MoreVertical, 
  Eye, 
  Pencil, 
  Trash2, 
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  ClipboardList,
  XCircle
} from 'lucide-react';
import { INITIAL_APPOINTMENTS } from '@/data/appointments';

const ITEMS_PER_PAGE = 5;

export function Appointments() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [viewingAppointment, setViewingAppointment] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filters
  const [branchFilter, setBranchFilter] = useState('All Branches');
  const [therapistFilter, setTherapistFilter] = useState('All Therapists');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const matchesBranch = branchFilter === 'All Branches' || app.branch === branchFilter;
      const matchesTherapist = therapistFilter === 'All Therapists' || app.therapist === therapistFilter;
      const matchesStatus = statusFilter === 'All Status' || app.status === statusFilter;
      return matchesBranch && matchesTherapist && matchesStatus;
    });
  }, [appointments, branchFilter, therapistFilter, statusFilter]);

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE) || 1;
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClearFilters = () => {
    setBranchFilter('All Branches');
    setTherapistFilter('All Therapists');
    setStatusFilter('All Status');
    setCurrentPage(1);
  };

  const statusColors: Record<string, string> = {
    CONFIRMED: 'text-[#2e8b8b] border-[#2e8b8b] bg-emerald-50',
    PENDING: 'text-orange-500 border-orange-500 bg-orange-50',
    COMPLETED: 'text-blue-500 border-blue-500 bg-blue-50',
    CANCELLED: 'text-red-500 border-red-500 bg-red-50',
  };


  return (
    <Layout>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Appointments</h1>
          <p className="text-sm font-medium text-slate-600 mt-1">
            Manage all scheduled appointments
          </p>
        </div>
        <button className="bg-[#5ab2b2] hover:bg-[#439c9c] text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm flex items-center space-x-2">
          <span className="text-lg leading-none">+</span>
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Date Picker</label>
            <div className="relative">
              <div className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm rounded-lg px-4 py-2.5 flex items-center space-x-2">
                <Calendar size={16} className="text-slate-400" />
                <span>Today, Oct 24, 2023</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Branch</label>
            <div className="relative">
              <select 
                value={branchFilter}
                onChange={(e) => { setBranchFilter(e.target.value); setCurrentPage(1); }}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2]"
              >
                <option>All Branches</option>
                <option>Downtown Clinic</option>
                <option>Westside Medical</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Therapist</label>
            <div className="relative">
              <select 
                value={therapistFilter}
                onChange={(e) => { setTherapistFilter(e.target.value); setCurrentPage(1); }}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2]"
              >
                <option>All Therapists</option>
                <option>Dr. Sarah Miller</option>
                <option>Dr. James Wilson</option>
                <option>Dr. Elena Costa</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2]"
              >
                <option>All Status</option>
                <option>CONFIRMED</option>
                <option>PENDING</option>
                <option>COMPLETED</option>
                <option>CANCELLED</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
          </div>
        </div>
        <button 
          onClick={handleClearFilters}
          className="mt-6 text-[#1e85b4] font-bold text-sm hover:underline flex items-center space-x-2"
        >
          <span>Clear filters</span>
        </button>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#dcf4f4] text-[10px] uppercase tracking-wider text-slate-700">
                <th className="px-6 py-4 font-bold">Time</th>
                <th className="px-6 py-4 font-bold">Patient Name</th>
                <th className="px-6 py-4 font-bold">Therapist</th>
                <th className="px-6 py-4 font-bold">Branch</th>
                <th className="px-6 py-4 font-bold">Session Type</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginatedAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{app.time}</div>
                    <div className={`text-[10px] mt-0.5 ${app.status === 'CANCELLED' ? 'text-red-400 font-medium' : 'text-slate-500'}`}>
                      {app.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${app.initialsBg}`}>
                        {app.initials}
                      </div>
                      <div className="font-bold text-slate-800">{app.patientName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{app.therapist}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{app.branch}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wide">
                      {app.sessionType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-[10px] tracking-wider text-[#5ab2b2]">
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center relative">
                    <button 
                      onClick={() => setActiveMenuId(activeMenuId === app.id ? null : app.id)}
                      className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                    >
                      <MoreVertical size={20} />
                    </button>
                    
                    {activeMenuId === app.id && (
                      <div 
                        ref={menuRef}
                        className="absolute right-12 top-10 w-36 bg-white border border-slate-100 shadow-xl rounded-lg py-1 z-10 transition-all animate-in fade-in zoom-in duration-100"
                      >
                        <button 
                          onClick={() => {
                            setViewingAppointment(app);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-[#dcf4f4] hover:text-[#2e8b8b] flex items-center space-x-2"
                        >
                          <Eye size={14} />
                          <span>View Detail</span>
                        </button>
                        <button 
                          onClick={() => {
                            alert(`Edit flow for ${app.patientName}`);
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-[#dcf4f4] hover:text-[#2e8b8b] flex items-center space-x-2"
                        >
                          <Pencil size={14} />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => {
                            if(confirm(`Delete appointment for ${app.patientName}?`)) {
                              setAppointments(appointments.filter(a => a.id !== app.id));
                            }
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <span className="font-medium uppercase text-[10px] tracking-wider font-bold">
            Showing <span className="text-[#5ab2b2]">{paginatedAppointments.length}</span> of {filteredAppointments.length} Scheduled Today
          </span>
          <div className="flex items-center space-x-1 font-semibold">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 text-[#5ab2b2] hover:bg-teal-50 rounded disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  currentPage === page 
                    ? 'bg-[#2e8b8b] text-white shadow-sm' 
                    : 'text-[#2e8b8b] hover:bg-teal-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 text-[#5ab2b2] hover:bg-teal-50 rounded disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-auto">
        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 rounded-lg">
            <CheckCircle2 size={24} className="text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">18</div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CONFIRMED</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-orange-50 rounded-lg">
            <Clock size={24} className="text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">4</div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PENDING</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <ClipboardList size={24} className="text-blue-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">12</div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">COMPLETED</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <XCircle size={24} className="text-red-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">2</div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CANCELLED</p>
          </div>
        </div>
      </div>

      {/* View Detail Modal */}
      {viewingAppointment && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className={`h-24 ${viewingAppointment.initialsBg} flex items-end justify-between px-8 pb-4`}>
              <div className="flex items-center space-x-4 translate-y-8">
                <div className={`w-20 h-20 rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold ${viewingAppointment.initialsBg}`}>
                  {viewingAppointment.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{viewingAppointment.patientName}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusColors[viewingAppointment.status]}`}>
                      {viewingAppointment.status}
                    </span>
                    <span className="text-slate-500 text-xs font-medium">{viewingAppointment.sessionType}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setViewingAppointment(null)}
                className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="pt-16 px-8 pb-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mobile Contact</p>
                  <p className="text-sm font-semibold text-slate-700">{viewingAppointment.details.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-semibold text-slate-700">{viewingAppointment.details.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Visit Date</p>
                  <p className="text-sm font-semibold text-slate-700">{viewingAppointment.details.lastVisit}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clinic Branch</p>
                  <p className="text-sm font-semibold text-slate-700">{viewingAppointment.branch}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Clinical Condition</p>
                  <p className="text-sm font-medium text-slate-700">{viewingAppointment.details.condition}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Next Steps / Notes</p>
                  <p className="text-sm font-medium text-slate-700">{viewingAppointment.details.nextSteps}</p>
                </div>
              </div>

              <div className="mt-8 flex space-x-3">
                <button 
                  onClick={() => {
                    alert(`Edit flow for ${viewingAppointment.patientName}`);
                    setViewingAppointment(null);
                  }}
                  className="flex-1 bg-[#2e8b8b] hover:bg-[#236a6a] text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-teal-100 flex items-center justify-center space-x-2"
                >
                  <Pencil size={18} />
                  <span>Edit Appointment</span>
                </button>
                <button 
                  onClick={() => setViewingAppointment(null)}
                  className="px-6 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3 rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

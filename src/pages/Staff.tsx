import { useState } from 'react';
import { Layout } from '../components/Layout';
import { 
  UserPlus, 
  Search, 
  ChevronDown, 
  MoreVertical, 
  Calendar,
  Clock,
  Briefcase,
  Users,
  AlertCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Activity,
  UserCheck,
  Receipt
} from 'lucide-react';
import { 
  STAFF_MEMBERS, 
  ATTENDANCE_RECORDS, 
  STAFF_SCHEDULES, 
  PAYROLL_RECORDS 
} from '../data/staff';
import type { StaffTab, AttendanceStatus, ShiftType } from '../types/staff';

export function Staff() {
  const [activeTab, setActiveTab] = useState<StaffTab>('List');
  const [searchTerm, setSearchTerm] = useState('');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'List': return <StaffListView searchTerm={searchTerm} />;
      case 'Attendance': return <AttendanceView />;
      case 'Schedules': return <SchedulesView searchTerm={searchTerm} />;
      case 'Payroll': return <PayrollView searchTerm={searchTerm} />;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Staff</h1>
            <p className="text-slate-500 mt-1">Manage clinic staff and operations</p>
          </div>
          <button className="flex items-center justify-center space-x-2 bg-[#5ab2b2] hover:bg-[#4a9f9f] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-teal-500/20 active:scale-95 group">
            <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
            <span>Add Staff</span>
          </button>
        </div>

        {/* Custom Tabs */}
        <div className="bg-slate-100/50 p-1.5 rounded-2xl inline-flex flex-wrap md:flex-nowrap gap-1 border border-slate-200/50">
          {(['List', 'Attendance', 'Schedules', 'Payroll'] as StaffTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSearchTerm(''); }}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-white text-teal-600 shadow-sm border border-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Staff {tab === 'List' ? 'List' : tab}
            </button>
          ))}
        </div>

        {/* Dynamic View */}
        {renderTabContent()}
      </div>
    </Layout>
  );
}

function StaffListView({ searchTerm }: { searchTerm: string }) {
  const staff = STAFF_MEMBERS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Filters */}
      <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, email or ID..." 
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
          <div className="relative w-full md:w-44 group">
            <select className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer pr-10">
              <option>Branch: All</option>
              <option>Downtown Clinic</option>
              <option>North Wellness</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative w-full md:w-44 group">
            <select className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer pr-10">
              <option>Status: All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <button className="text-teal-600 text-[10px] font-bold uppercase tracking-widest hover:text-teal-700 font-bold flex items-center space-x-2">
          <Filter size={14} />
          <span>Clear Filters</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#f2fafa] text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-100">
              <th className="px-6 py-4">Staff Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Branch</th>
              <th className="px-6 py-4">Mobile</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <img src={member.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{member.name}</p>
                      <p className="text-xs text-slate-400">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    member.role.includes('Senior') ? 'bg-teal-50 text-teal-600' :
                    member.role.includes('Nurse') ? 'bg-teal-50 text-teal-600' :
                    member.role.includes('Admin') ? 'bg-slate-50 text-slate-600' :
                    'bg-teal-50 text-teal-600'
                  }`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{member.department}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{member.branch}</td>
                <td className="px-6 py-5 text-sm text-slate-600 font-medium">{member.mobile}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-teal-500' : 'bg-slate-300'}`} />
                    <span className={`text-[11px] font-bold ${member.status === 'Active' ? 'text-teal-600' : 'text-slate-400'}`}>
                      {member.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400">Showing 1 to 4 of 24 staff members</p>
        <div className="flex items-center space-x-2">
          <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white disabled:opacity-50">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-xs ring-2 ring-teal-500/20">1</button>
          <button className="w-8 h-8 rounded-lg text-slate-600 hover:bg-white hover:border-slate-200 font-bold text-xs transition-all border border-transparent">2</button>
          <button className="w-8 h-8 rounded-lg text-slate-600 hover:bg-white hover:border-slate-200 font-bold text-xs transition-all border border-transparent">3</button>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-white">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AttendanceView() {
  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'Present': return 'bg-teal-50 text-teal-600 border-teal-100';
      case 'Late': return 'bg-red-50 text-red-600 border-red-100';
      case 'Leave': return 'bg-slate-50 text-slate-600 border-slate-100';
      case 'Absent': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Attendance Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-56 group">
            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <div className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700">
              10/27/2023
            </div>
          </div>
          <div className="relative w-full md:w-64 group">
            <div className="relative">
              <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select className="w-full appearance-none bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm font-bold text-slate-700 focus:outline-none cursor-pointer">
                <option>Main Branch - Downtown</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 text-xs font-bold uppercase tracking-widest px-4">
            <Activity size={16} />
            <span>More Filters</span>
          </button>
          <button className="flex items-center space-x-2 text-slate-600 hover:text-teal-600 text-xs font-bold uppercase tracking-widest bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
            <Download size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-50">
              <th className="px-6 py-4">Staff Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Check-in Time</th>
              <th className="px-6 py-4">Remarks</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {ATTENDANCE_RECORDS.map((rec) => (
              <tr key={rec.id} className="hover:bg-slate-50/50 transition-all font-medium">
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <img src={rec.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{rec.staffName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{rec.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-500 font-bold">{rec.date}</td>
                <td className="px-6 py-5">
                  <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold ${getStatusBadge(rec.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      rec.status === 'Present' ? 'bg-teal-500' :
                      rec.status === 'Late' ? 'bg-red-400' :
                      rec.status === 'Leave' ? 'bg-slate-400' : 'bg-red-600'
                    }`} />
                    <span>{rec.status}</span>
                    <ChevronDown size={12} className="opacity-40" />
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-bold text-slate-700">{rec.checkInTime}</td>
                <td className="px-6 py-5 text-sm text-slate-400 font-medium">{rec.remarks}</td>
                <td className="px-6 py-5">
                  <button className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Footer */}
        <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">Showing 1-5 of 42 staff members</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-xs">1</button>
            <button className="w-8 h-8 rounded-lg text-slate-600 font-bold text-xs">2</button>
            <button className="w-8 h-8 rounded-lg text-slate-600 font-bold text-xs">3</button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-600"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#e7f7f7] rounded-3xl p-6 border border-teal-100 group hover:shadow-lg transition-all cursor-pointer relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Attendance Rate</p>
            <div className="w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center text-teal-600 shadow-sm">
              <BarChart size={18} />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-slate-800">94.2%</h3>
          <div className="mt-2 flex items-center text-teal-600 text-xs font-bold">
            <ChevronUp size={14} />
            <span>2.1% from last month</span>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 group hover:shadow-lg transition-all cursor-pointer relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Late Patterns</p>
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-600 shadow-sm">
              <Clock size={18} />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-slate-800">3 Avg/Day</h3>
          <p className="mt-2 text-slate-400 text-xs font-bold">Mainly morning shifts</p>
        </div>

        <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-50 group hover:shadow-lg transition-all cursor-pointer relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Leaves</p>
            <div className="w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
              <Activity size={18} />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-slate-800">04 Staff</h3>
          <p className="mt-2 text-slate-400 text-xs font-bold">Replacing with floaters</p>
        </div>
      </div>
    </div>
  );
}

function SchedulesView({ searchTerm }: { searchTerm: string }) {
  const getShiftBadge = (shift: ShiftType) => {
    switch (shift) {
      case 'Morning': return 'bg-teal-50 text-teal-600';
      case 'Evening': return 'bg-slate-100 text-slate-600';
      case 'Night': return 'bg-blue-50 text-blue-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-slate-50/10 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-80 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search staff member..." 
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all"
          />
        </div>
        <div className="relative w-full md:w-56 group">
          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-sm font-bold text-slate-700 focus:outline-none cursor-pointer">
            <option>Oct 23 - Oct 29, 2023</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
        <div className="flex-grow md:flex md:justify-end gap-3 w-full">
          <button className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:text-teal-600 transition-all">
            <Filter size={18} />
          </button>
          <button className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold transition-all group">
            <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Export List</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-bold border-b border-slate-50">
              <th className="px-6 py-4">Staff Name</th>
              <th className="px-6 py-4">Shift</th>
              <th className="px-6 py-4 text-center">Working Hours</th>
              <th className="px-6 py-4">Assigned Branch</th>
              <th className="px-6 py-4 text-center">Days</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50/50">
            {STAFF_SCHEDULES.map((sch) => (
              <tr key={sch.id} className="hover:bg-slate-50/50 transition-all group pointer-events-none">
                <td className="px-6 py-6">
                  <div className="flex items-center space-x-3">
                    <img src={sch.avatar} alt="" className="w-10 h-10 rounded-xl shadow-lg object-cover ring-2 ring-white" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{sch.staffName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{sch.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-[10px] font-bold ${getShiftBadge(sch.shift)}`}>
                    <div className={`w-1 h-1 rounded-full ${
                      sch.shift === 'Morning' ? 'bg-teal-400' :
                      sch.shift === 'Night' ? 'bg-blue-400' : 'bg-slate-400'
                    }`} />
                    <span>{sch.shift}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-sm font-bold text-slate-700 text-center">{sch.workingHours}</td>
                <td className="px-6 py-6 text-sm text-slate-500 font-medium">{sch.assignedBranch}</td>
                <td className="px-6 py-6">
                  <div className="flex items-center justify-center space-x-1.5">
                    {['M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div 
                        key={i}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
                          sch.days.includes(day) ? 'bg-[#134e4a] text-white' : 'bg-slate-100 text-slate-300'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-6">
                  <button className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400">Showing 1-3 of 24 staff members</p>
        <div className="flex items-center space-x-2">
          <button className="p-2 border border-slate-200 rounded-lg text-slate-300 pointer-events-none"><ChevronLeft size={16} /></button>
          <button className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-xs ring-4 ring-teal-500/10 shadow-lg">1</button>
          <button className="w-8 h-8 rounded-lg text-slate-600 border border-transparent font-bold text-xs">2</button>
          <button className="w-8 h-8 rounded-lg text-slate-600 border border-transparent font-bold text-xs">3</button>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-white transition-all"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

function PayrollView({ searchTerm }: { searchTerm: string }) {
  const [currentMonth, setCurrentMonth] = useState('October 2023');

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header Filters */}
      <div className="p-6 border-b border-slate-50 bg-slate-50/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-44 group">
            <select 
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none cursor-pointer pr-10"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(e.target.value)}
            >
              <option>October 2023</option>
              <option>September 2023</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative w-full md:w-64 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-teal-50/50 hover:bg-teal-50 text-teal-700 px-6 py-2.5 rounded-xl border border-teal-100 text-xs font-bold transition-all">
          <Receipt size={16} />
          <span>Generate Payroll</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-bold border-b border-slate-50">
              <th className="px-8 py-4">Staff Name</th>
              <th className="px-6 py-4 text-center">Days Present</th>
              <th className="px-6 py-4 text-right">Salary</th>
              <th className="px-6 py-4 text-right">Deductions</th>
              <th className="px-6 py-4 text-right">Bonus</th>
              <th className="px-6 py-4 text-right px-8">Net Pay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50/50">
            {PAYROLL_RECORDS.map((rec) => (
              <tr key={rec.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-3">
                    <img src={rec.avatar} alt="" className="w-10 h-10 rounded-xl object-cover shadow-sm ring-2 ring-white" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{rec.staffName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{rec.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-bold text-slate-700 text-center">{rec.daysPresent}</td>
                <td className="px-6 py-5 text-sm font-bold text-slate-700 text-right">
                  ₹{rec.salary.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-5 text-sm font-bold text-red-400 text-right">
                  -₹{rec.deductions.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-5 text-sm font-bold text-teal-500 text-right">
                  ₹{rec.bonus.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-8 py-5 text-sm font-bold text-slate-800 text-right">
                  ₹{rec.netPay.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Monthly Total */}
      <div className="p-8 border-t-2 border-dashed border-slate-100 flex items-center justify-end space-x-8 bg-slate-50/20">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Monthly Total:</p>
        <h4 className="text-3xl font-black text-[#134e4a]">₹29,80,000.00</h4>
      </div>
    </div>
  );
}

function BarChart({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function BarChart2Icon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20V14" />
    </svg>
  );
}

function ChevronUp({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

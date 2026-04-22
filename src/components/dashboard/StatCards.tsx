import { Users, Calendar, Banknote, ClipboardClock, BriefcaseMedical } from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';

export function StatCards({ branch }: { branch: string }) {
  const { patients: allPatients, appointments: allAppointments, staff: allStaff, invoices: allInvoices } = useAppData();

  const patients = branch === 'All Branches' ? allPatients : allPatients.filter(p => p.branch === branch);
  const appointments = branch === 'All Branches' ? allAppointments : allAppointments.filter(a => a.branch === branch);
  const staff = branch === 'All Branches' ? allStaff : allStaff.filter(s => s.branch === branch);
  const invoices = branch === 'All Branches' ? allInvoices : allInvoices;

  const activeInvoicesCount = invoices.filter(i => i.status !== 'PAID').length;

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      change: '+12.5%',
      trend: 'up',
      iconName: 'Users',
      iconBg: 'bg-[#e0f4f4]',
      trendBg: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Total Appointments',
      value: appointments.length,
      change: '+4.3%',
      trend: 'up',
      iconName: 'Calendar',
      iconBg: 'bg-[#e0f4f4]',
      trendBg: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Active Invoices',
      value: activeInvoicesCount,
      change: '-2.1%',
      trend: 'down',
      iconName: 'Banknote',
      iconBg: 'bg-[#e0f4f4]',
      trendBg: 'bg-red-50 text-red-600'
    },
    {
       title: 'Clinic Staff',
       value: staff.length,
       change: '0%',
       trend: '',
       iconName: 'BriefcaseMedical',
       iconBg: 'bg-[#e0f4f4]',
       trendBg: 'bg-slate-50 text-slate-500'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users size={20} className="text-[#138db5]" />;
      case 'Calendar': return <Calendar size={20} className="text-[#138db5]" />;
      case 'Banknote': return <Banknote size={20} className="text-[#138db5]" />;
      case 'ClipboardClock': return <ClipboardClock size={20} className="text-[#138db5]" />;
      case 'BriefcaseMedical': return <BriefcaseMedical size={20} className="text-[#138db5]" />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div 
          key={stat.title} 
          className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#5ab2b2]/20 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
              {getIcon(stat.iconName)}
            </div>
            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${stat.trendBg}`}>
              {stat.change} {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : ''}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

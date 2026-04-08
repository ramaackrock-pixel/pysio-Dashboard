import { Users, Calendar, Banknote, ClipboardClock, BriefcaseMedical } from 'lucide-react';
import { DASHBOARD_STATS } from '@/data/dashboard';

export function StatCards() {
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

  const stats = DASHBOARD_STATS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#5ab2b2]/20 cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
              {getIcon(stat.iconName)}
            </div>
            <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${stat.trendBg}`}>
              {stat.change} {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : ''}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 mb-1">{stat.title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

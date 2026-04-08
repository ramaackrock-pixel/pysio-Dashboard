import { MapPin } from 'lucide-react';

export function BranchPerformance() {
  const branches = [
    { name: 'Downtown Clinic', type: 'MAIN HUB', revenue: '₹42.5k', appts: '18', staff: '8', iconColor: 'text-blue-500', iconBg: 'bg-blue-100' },
    { name: 'Westside Wellness', type: 'SATELLITE', revenue: '₹28.2k', appts: '14', staff: '6', iconColor: 'text-teal-500', iconBg: 'bg-teal-100' },
    { name: 'East Side Physio', type: 'REHAB SPECIALTY', revenue: '₹14.0k', appts: '10', staff: '4', iconColor: 'text-indigo-500', iconBg: 'bg-indigo-100' },
  ];

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800">Branch Performance</h2>
        <button className="text-[#5ab2b2] text-xs font-bold uppercase hover:underline">
          View Detailed Report →
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branches.map((branch, i) => (
          <div 
            key={i} 
            className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#5ab2b2]/20 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-6 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${branch.iconBg}`}>
                <MapPin size={20} className={branch.iconColor} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-[15px]">{branch.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider">
                  {branch.type}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-auto">
              <div className="text-center w-1/3">
                <p className="text-[10px] font-bold text-slate-400 mb-1">REVENUE</p>
                <p className="font-bold text-[#5ab2b2]">{branch.revenue}</p>
              </div>
              <div className="text-center w-1/3 border-l border-r border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 mb-1">APPTS</p>
                <p className="font-bold text-[#3b82f6]">{branch.appts}</p>
              </div>
              <div className="text-center w-1/3">
                <p className="text-[10px] font-bold text-slate-400 mb-1">STAFF</p>
                <p className="font-bold text-[#3b82f6]">{branch.staff}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

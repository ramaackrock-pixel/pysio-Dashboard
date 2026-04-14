
import { useAppData } from '@/context/AppDataContext';

export function CollectionStatus() {
  const { invoices } = useAppData();

  const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalTarget = 1000000; // Mock goal of 10L
  const percentage = Math.min(Math.round((totalCollected / totalTarget) * 100), 100);

  return (
    <div className="bg-[#5ab2b2] p-6 rounded-xl text-white col-span-1 shadow-md shadow-teal-500/10 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-1 cursor-pointer group">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
      
      <div className="flex justify-between items-start mb-6 align-top">
        <h3 className="font-semibold text-teal-50">Collection Status</h3>
        <span className="text-xs text-teal-100 font-medium tracking-wide">GLOBAL GOAL</span>
      </div>
      
      <div>
        <p className="text-teal-100 text-sm mb-1 uppercase tracking-wider font-bold text-[10px]">Total Collected</p>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-3xl font-black">₹{totalCollected.toLocaleString('en-IN')}</h2>
          <span className="bg-teal-600/50 text-white text-[10px] font-black px-2 py-1 rounded-lg backdrop-blur-sm border border-white/10">
            {percentage}% GOAL
          </span>
        </div>
        
        <div className="w-full h-2 bg-teal-700/40 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-white rounded-full shadow-sm transition-all duration-1000" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}


export function CollectionStatus() {
  return (
    <div className="bg-[#5ab2b2] p-6 rounded-xl text-white col-span-1 shadow-md shadow-teal-500/10 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-1 cursor-pointer group">
      {/* Decorative gradient overlay matching the image feel slightly */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
      
      <div className="flex justify-between items-start mb-6 align-top">
        <h3 className="font-semibold text-teal-50">Collection Status</h3>
        <span className="text-xs text-teal-100 font-medium">This Month</span>
      </div>
      
      <div>
        <p className="text-teal-100 text-sm mb-1">Total Collected</p>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-3xl font-bold">₹7,33,200</h2>
          <span className="bg-teal-600/50 text-white text-[10px] font-bold px-2 py-1 rounded">
            86.7% GOAL
          </span>
        </div>
        
        <div className="w-full h-2 bg-teal-700/40 rounded-full mt-2">
          <div className="h-full bg-white rounded-full w-[86.7%] shadow-sm"></div>
        </div>
      </div>
    </div>
  );
}

import { useAppData } from '@/context/AppDataContext';

export function RecentPatients({ branch }: { branch: string }) {
  const { patients: allPatients } = useAppData();

  const patients = (branch === 'All Branches' 
    ? allPatients 
    : allPatients.filter(p => p.branch === branch)
  ).slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex-1">
      <div className="p-6 flex justify-between items-center border-b border-slate-50">
        <h3 className="font-bold text-slate-800">Recent Patients</h3>
        <button className="text-[#3b82f6] text-xs font-bold hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#e0f4f4] text-[10px] uppercase tracking-wider text-slate-600">
              <th className="px-6 py-3 font-semibold w-[45%]">Name</th>
              <th className="px-6 py-3 font-semibold">PID</th>
              <th className="px-6 py-3 font-semibold">Last Visit</th>
              <th className="px-6 py-3 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {patients.map((patient, i) => (
              <tr key={i} className="hover:bg-slate-50 cursor-pointer">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${patient.initialsBg}`}>
                    {patient.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{patient.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">{patient.pid}</td>
                <td className="px-6 py-4 text-slate-500">{patient.lastVisit}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${patient.statusColor}`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export function AppointmentStatus() {
  const stats = [
    { label: 'Confirmed', count: 28, percentage: 67, color: 'bg-teal-500' },
    { label: 'Pending', count: 10, percentage: 24, color: 'bg-blue-300' },
    { label: 'Cancelled', count: 4, percentage: 9, color: 'bg-red-400' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm col-span-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800">Appointment Status</h3>
        <span className="text-xs font-medium text-slate-500">Today</span>
      </div>

      <div className="space-y-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-medium text-slate-600">{stat.label}</span>
              <span className="font-bold text-slate-800">{stat.count} <span className="text-slate-400 font-normal">({stat.percentage}%)</span></span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${stat.color} rounded-full`}
                style={{ width: `${stat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

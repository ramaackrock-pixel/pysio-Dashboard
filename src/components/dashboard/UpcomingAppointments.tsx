import { UPCOMING_APPOINTMENTS } from '@/data/dashboard';

export function UpcomingAppointments() {
  const appointments = UPCOMING_APPOINTMENTS;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex-1">
      <div className="p-6 flex justify-between items-center border-b border-slate-50">
        <h3 className="font-bold text-slate-800">Upcoming Appointments</h3>
        <span className="text-[#3b82f6] text-xs font-bold">Today</span>
      </div>

      <div className="divide-y divide-slate-50">
        {appointments.map((appt, i) => (
          <div key={i} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="flex items-start space-x-6">
              <div className="text-center w-12 pt-1 border-r border-slate-200 pr-4">
                <span className="block font-bold text-[#3b82f6] text-lg leading-tight">{appt.time}</span>
                <span className="text-[10px] font-bold text-slate-400">{appt.period}</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{appt.name}</h4>
                <p className="text-xs text-slate-500 mt-1">Therapist: {appt.therapist}</p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${appt.statusColor}`}>
              {appt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

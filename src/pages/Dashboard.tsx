import { Layout } from '@/components/Layout';
import { StatCards } from '@/components/dashboard/StatCards';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { AppointmentStatus } from '@/components/dashboard/AppointmentStatus';
import { CollectionStatus } from '@/components/dashboard/CollectionStatus';
import { BranchPerformance } from '@/components/dashboard/BranchPerformance';
import { RecentPatients } from '@/components/dashboard/RecentPatients';
import { UpcomingAppointments } from '@/components/dashboard/UpcomingAppointments';

export function Dashboard() {
  return (
    <Layout>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, here is what's happening today across your clinic network.
          </p>
        </div>

        <div className="flex space-x-4 items-center">
          <div className="flex bg-slate-100 rounded-lg p-1 space-x-1">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-semibold text-[#5ab2b2]">Daily</button>
            <button className="px-4 py-1.5 text-slate-500 hover:text-slate-700 text-sm font-semibold transition-colors">Weekly</button>
            <button className="px-4 py-1.5 text-slate-500 hover:text-slate-700 text-sm font-semibold transition-colors">Monthly</button>
          </div>

          <div className="relghansoli apartmentsative">
            <select className="appearance-none bg-[#e0f4f4] text-[#5ab2b2] font-semibold text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none border-none cursor-pointer h-[36px]">
              <option>All Branches</option>
              <option>Downtown Clinic</option>
              <option>Westside Wellness</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#5ab2b2]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <button className="bg-[#439c9c] hover:bg-[#b52b2] text-white text-sm font-bold py-3 px-8 rounded-lg transition-colors shadow-sm flex items-center space-x-2">
            <span className="text-alg leading-none">+</span>
            <span>NEW APPOINTMENT</span>
          </button>
        </div>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <TrendChart />
        </div>
        <div className="col-span-1 space-y-6">
          <AppointmentStatus />
          <CollectionStatus />
        </div>
      </div>

      <BranchPerformance />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentPatients />
        <UpcomingAppointments />
      </div>
    </Layout>
  );
}

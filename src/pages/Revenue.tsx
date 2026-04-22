import { Layout } from '@/components/Layout';
import { CollectionStatus } from '@/components/dashboard/CollectionStatus';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { useAppData } from '@/context/AppDataContext';
import { Banknote, TrendingUp, CreditCard, Wallet } from 'lucide-react';

export function Revenue() {
  const { invoices } = useAppData();

  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const pendingRevenue = invoices.reduce((acc, inv) => acc + inv.dueAmount, 0);
  const collectionRate = ((totalRevenue / (totalRevenue + pendingRevenue)) * 100).toFixed(1);

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${(totalRevenue / 100000).toFixed(2)}L`,
      change: '+12.5%',
      icon: <Banknote size={24} className="text-teal-600" />,
      bg: 'bg-teal-50'
    },
    {
      title: 'Pending Collection',
      value: `₹${(pendingRevenue / 100000).toFixed(2)}L`,
      change: '-2.1%',
      icon: <Wallet size={24} className="text-orange-600" />,
      bg: 'bg-orange-50'
    },
    {
      title: 'Collection Rate',
      value: `${collectionRate}%`,
      change: '+4.3%',
      icon: <TrendingUp size={24} className="text-blue-600" />,
      bg: 'bg-blue-50'
    },
    {
      title: 'Outstanding Invoices',
      value: invoices.filter(i => i.status !== 'PAID').length,
      change: '-5%',
      icon: <CreditCard size={24} className="text-purple-600" />,
      bg: 'bg-purple-50'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 mt-1">Track clinic revenue, collections, and financial trends</p>
        </div>

        {/* Financial Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">Revenue Growth</h3>
                <select className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-500 px-3 py-2 focus:ring-2 focus:ring-teal-500/20">
                  <option>Last 6 Months</option>
                  <option>Last 12 Months</option>
                </select>
              </div>
              <TrendChart />
            </div>
          </div>
          <div className="lg:col-span-1">
            <CollectionStatus />
          </div>
        </div>

        {/* Detailed Breakdown Section Placeholder */}
        <div className="bg-slate-800 rounded-3xl p-8 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Detailed Financial Reports</h3>
            <p className="text-slate-300 max-w-md text-sm mb-6">
              Download comprehensive tax reports, branch-wise performance audits, and insurance claim summaries.
            </p>
            <button className="bg-[#5ab2b2] hover:bg-[#4a9f9f] text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95">
              Generate Report
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
            <TrendingUp size={300} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

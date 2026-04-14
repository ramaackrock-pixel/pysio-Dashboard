import { useState } from 'react';
import { Layout } from '../components/Layout';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  FileText,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Activity,
  ChevronDown
} from 'lucide-react';
import {
  REVENUE_TRENDS,
  PATIENT_DEMOGRAPHICS,
  TREATMENT_POPULARITY,
  BRANCH_ANALYTICS,
  KEY_OPERATIONAL_METRICS
} from '../data/reports';

export function Reports() {
  const [timeRange] = useState('This Quarter');

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Analytics & Reports</h1>
            <p className="text-slate-500 mt-1">Institutional performance and clinical insights</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative group w-full sm:w-auto">
              <button className="w-full flex items-center justify-between sm:justify-start space-x-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:border-teal-500 transition-all shadow-sm">
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-teal-500" />
                  <span>{timeRange}</span>
                </div>
                <ChevronDown size={16} />
              </button>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#5ab2b2] hover:bg-[#4a9f9f] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-teal-500/20 active:scale-95 group">
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KEY_OPERATIONAL_METRICS.map((metric, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.label}</p>
                <div className={`flex items-center text-[10px] font-bold ${metric.trend < 0 ? 'text-red-500' : 'text-teal-500'}`}>
                  {metric.trend >= 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {Math.abs(metric.trend)}%
                </div>
              </div>
              <div className="flex items-baseline space-x-1">
                <h3 className="text-2xl font-black text-slate-800">{metric.value}</h3>
                <span className="text-xs font-bold text-slate-400">{metric.suffix}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue Performance */}
          <div className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-800">Revenue Analysis</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">Actual vs Target (All Branches)</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                  <span className="text-[10px] font-bold text-slate-500">ACTUAL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="text-[10px] font-bold text-slate-500">TARGET</span>
                </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_TRENDS}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                    tickFormatter={(value) => `₹${value / 100000}L`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    formatter={(value: any, name: any) => [`₹${Number(value).toLocaleString('en-IN')}`, name === 'revenue' ? 'Revenue' : 'Target']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demographic Breakdown */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-2">Patient Demographics</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Age Group Distribution</p>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PATIENT_DEMOGRAPHICS}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="category"
                  >
                    {PATIENT_DEMOGRAPHICS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => <span className="text-[10px] font-bold text-slate-500 uppercase">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Treatment Popularity */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-800">Treatment Mix</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Utilization by Sessions</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg text-teal-600">
                <Activity size={20} />
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={TREATMENT_POPULARITY} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="service"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
                    width={100}
                  />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="sessions" fill="#2dd4bf" radius={[0, 10, 10, 0]} barSize={20} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Branch Comparison */}
          <div className="bg-[#1e293b] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <FileText size={120} className="text-white" />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-xl font-black text-white">Branch Comparison</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-Facility Performance</p>
              </div>
              <div className="space-y-6 flex-grow">
                {BRANCH_ANALYTICS.map((branch, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-300 uppercase">{branch.branch}</span>
                      <span className="text-xs font-black text-teal-400">₹{(branch.revenue / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full transition-all duration-1000 group-hover:bg-teal-400"
                        style={{ width: `${(branch.revenue / 2854000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top Performer</p>
                  <p className="text-sm font-black text-white">Downtown Clinic</p>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 bg-teal-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-400 transition-colors">
                  View Facility details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

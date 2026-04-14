import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'MON', revenue: 200, visits: 100 },
  { name: 'TUE', revenue: 300, visits: 150 },
  { name: 'WED', revenue: 200, visits: 80 },
  { name: 'THU', revenue: 900, visits: 400 },
  { name: 'FRI', revenue: 250, visits: 120 },
  { name: 'SAT', revenue: 800, visits: 380 },
  { name: 'SUN', revenue: 0, visits: 0 },
];

export function TrendChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm col-span-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#5ab2b2]/20 cursor-pointer group">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Visits & Revenue Trend</h2>
          <p className="text-sm text-slate-500">Comparison between patient intake and daily billing.</p>
        </div>
        <div className="flex items-center space-x-4 text-sm font-medium text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#1e78b4]"></span>
            <span>Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#82cae3]"></span>
            <span>Visits</span>
          </div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#1e78b4"
              strokeWidth={3}
              dot={{ r: 4, fill: '#1e78b4', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#82cae3"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

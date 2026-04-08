import { Search, Bell, HelpCircle } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

export function Header() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <header className="flex items-center justify-between h-16 px-8 bg-white border-b border-slate-200">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search patients, records or staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ab2b2] focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 ml-4">
        <button className="text-slate-500 hover:text-slate-700 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="text-slate-500 hover:text-slate-700">
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
}

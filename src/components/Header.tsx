import { Search, Bell, HelpCircle, Menu } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-8 bg-white border-b border-slate-200">
      <div className="flex items-center space-x-4 lg:hidden mr-4">
        <button 
          onClick={onMenuClick}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

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

      <div className="flex items-center space-x-2 md:space-x-6 ml-4">
        <button className="text-slate-500 hover:text-slate-700 relative p-2">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="hidden md:block text-slate-500 hover:text-slate-700 p-2">
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
}

import { LayoutDashboard, Users, Calendar, FileText, CreditCard, UserCircle, Building2, BarChart2, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('physio_auth');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/dashboard' },
    { name: 'Patients', icon: <Users size={18} />, href: '/patients' },
    { name: 'Appointments', icon: <Calendar size={18} />, href: '/appointments' },
    { name: 'Medical Records', icon: <FileText size={18} />, href: '/records' },
    { name: 'Billing', icon: <CreditCard size={18} />, href: '/billing' },
    { name: 'Staff', icon: <UserCircle size={18} />, href: '/staff' },
    { name: 'Branches', icon: <Building2 size={18} />, href: '/branches' },
    { name: 'Reports', icon: <BarChart2 size={18} />, href: '/reports' },
    { name: 'Settings', icon: <Settings size={18} />, href: '/settings' },
  ];

  return (
    <aside className="w-64 bg-[#d8f0f0] min-h-screen flex flex-col border-r border-[#c2e2e2]">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-800">Physio</h1>
        <p className="text-[10px] font-semibold text-slate-500 tracking-widest mt-1 uppercase">Health Enterprise</p>
      </div>

      <div className="px-4 py-2 flex-grow overflow-y-auto space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                ? 'bg-[#5ab2b2] text-white shadow-sm'
                : 'text-slate-600 hover:bg-[#c2e2e2] hover:text-slate-900'
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 mt-auto border-t border-[#c2e2e2]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden">
              {/* Replace with actual image later if needed */}
              <UserCircle size={24} className="text-slate-500" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800">Dr. John Doe</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

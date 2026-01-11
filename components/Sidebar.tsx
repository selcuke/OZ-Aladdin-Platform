import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, ShieldAlert, BrainCircuit, Activity, Settings, FileText } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Portfolio', icon: PieChart, path: '/portfolio' },
    { name: 'Risk Analysis', icon: ShieldAlert, path: '/risk' },
    { name: 'Aladdin AI', icon: BrainCircuit, path: '/ai' },
    { name: 'Markets', icon: Activity, path: '/markets' },
    { name: 'Reports', icon: FileText, path: '/reports' },
  ];

  return (
    <div className="w-20 lg:w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50 transition-all duration-300">
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center font-bold text-white text-xl">A</div>
        <span className="hidden lg:block ml-3 font-semibold text-lg tracking-tight text-white">Aladdin</span>
      </div>

      <nav className="flex-1 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mx-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border-l-2 border-blue-500'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`
            }
          >
            <item.icon className="w-5 h-5 min-w-[20px]" />
            <span className="hidden lg:block ml-3 text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center w-full px-2 py-2 text-slate-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span className="hidden lg:block ml-3 text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
import { LayoutDashboard, BarChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Courses', path: '/admin/courses' },
    { icon: <BarChart className="w-5 h-5" />, label: 'Analytics', path: '/admin/analytics' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
              ${location.pathname === item.path
                ? 'bg-blue-50 text-blue-900'
                : 'text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
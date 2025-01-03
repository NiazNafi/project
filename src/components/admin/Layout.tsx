import { LayoutDashboard, MessageSquare } from 'lucide-react';
import { AdminNavbar } from './AdminNavbar';

interface LayoutProps {
  children: React.ReactNode;
  currentView: 'courses' | 'complaints';
  onViewChange: (view: 'courses' | 'complaints') => void;
}

export function Layout({ children, currentView, onViewChange }: LayoutProps) {
  const menuItems = [
    { id: 'courses', label: 'Courses', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'complaints', label: 'Complaint Box', icon: <MessageSquare className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as 'courses' | 'complaints')}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${currentView === item.id
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
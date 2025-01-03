import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen, Settings, LogOut } from 'lucide-react';
import { AuthService } from '../../services/auth';

export function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <User className="w-6 h-6 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).firstName : 'User'}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).email : 'user@example.com'}
            </p>
          </div>

          <div className="py-1">
            <button
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              My Learning
            </button>
            <button
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </button>
          </div>

          <div className="py-1 border-t border-gray-100">
            <button
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import { Bell, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { NotificationDropdown } from './NotificationDropdown';
import { UserDropdown } from './UserDropdown';

export function AdminNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-900">Admin Panel</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
import { BookOpen, Brain, Edit3, ClipboardList } from 'lucide-react';

export type TabType = 'overview' | 'content' | 'notes' | 'reviews' | 'ai';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'overview' as const, icon: <BookOpen className="w-4 h-4" />, label: 'Overview' },
    { id: 'content' as const, icon: <Edit3 className="w-4 h-4" />, label: 'Course Content' },
    { id: 'notes' as const, icon: <BookOpen className="w-4 h-4" />, label: 'Notes' },
    { id: 'reviews' as const, icon: <Edit3 className="w-4 h-4" />, label: 'Reviews' },
    { id: 'MCQ' as const, icon: <ClipboardList className="w-4 h-4" />, label: 'MCQ' },
    { id: 'ai' as const, icon: <Brain className="w-4 h-4" />, label: 'AI Help' }
  ];

  return (
    <div className="flex space-x-6 border-b border-gray-200 mb-6">
      {tabs.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === id
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-gray-600 hover:text-blue-900'
          }`}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
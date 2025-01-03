import { ReactNode } from 'react';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: ReactNode;
  tooltip: string;
}

export function ToolbarButton({ onClick, isActive, icon, tooltip }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-200 transition-colors relative group ${
        isActive ? 'bg-gray-200 text-blue-900' : 'text-gray-600'
      }`}
      title={tooltip}
    >
      {icon}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {tooltip}
      </span>
    </button>
  );
}
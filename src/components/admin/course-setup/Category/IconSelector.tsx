import { useState } from "react";
import { Search } from "lucide-react";
import * as Icons from "lucide-react";

interface IconSelectorProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
}

export function IconSelector({
  selectedIcon,
  onSelectIcon,
}: IconSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get all icons from lucide-react
  const iconList = Object.entries(Icons)
    .filter(
      ([name]) =>
        name !== "createLucideIcon" &&
        name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 100); // Limit to first 100 matching icons for performance

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search icons..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto p-2">
        {iconList.map(([name, Icon]) => (
          <button
            key={name}
            onClick={() => onSelectIcon(name)}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              selectedIcon === name ? "bg-blue-50 ring-2 ring-blue-500" : ""
            }`}
            title={name}
          >
            <Icon className="w-6 h-6" />
          </button>
        ))}
      </div>
    </div>
  );
}

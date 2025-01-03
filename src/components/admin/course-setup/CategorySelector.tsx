import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, BookOpen, TrendingUp, Database, Globe } from 'lucide-react';

interface CategorySelectorProps {
  initialCategory?: string;
  onUpdate: (category: string) => void;
}

const categories = [
  { id: 'programming', name: 'Programming', icon: Code, color: 'blue' },
  { id: 'design', name: 'Design', icon: Palette, color: 'pink' },
  { id: 'business', name: 'Business', icon: TrendingUp, color: 'green' },
  { id: 'marketing', name: 'Marketing', icon: BookOpen, color: 'purple' },
  { id: 'data-science', name: 'Data Science', icon: Database, color: 'yellow' },
  { id: 'languages', name: 'Languages', icon: Globe, color: 'red' }
];

const getColorClasses = (color: string, isSelected: boolean) => {
  const baseClasses = 'border-2 rounded-lg p-6 transition-all';
  if (!isSelected) {
    return `${baseClasses} border-gray-200 hover:border-gray-300 hover:shadow-md`;
  }

  const colorMap = {
    blue: 'border-blue-500 bg-blue-50',
    pink: 'border-pink-500 bg-pink-50',
    green: 'border-green-500 bg-green-50',
    purple: 'border-purple-500 bg-purple-50',
    yellow: 'border-yellow-500 bg-yellow-50',
    red: 'border-red-500 bg-red-50'
  };

  return `${baseClasses} ${colorMap[color as keyof typeof colorMap]}`;
};

export function CategorySelector({ initialCategory, onUpdate }: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onUpdate(categoryId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Category</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(category.id)}
              className={getColorClasses(category.color, isSelected)}
            >
              <div className="flex flex-col items-center text-center">
                <Icon className={`w-8 h-8 mb-3 ${isSelected ? `text-${category.color}-500` : 'text-gray-400'}`} />
                <h3 className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                  {category.name}
                </h3>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
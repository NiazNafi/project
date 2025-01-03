import { useState } from 'react';
import { Check } from 'lucide-react';

interface Interest {
  id: string;
  name: string;
  icon: string;
}

const interests: Interest[] = [
  { id: 'programming', name: 'Programming', icon: '💻' },
  { id: 'design', name: 'Design', icon: '🎨' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'marketing', name: 'Marketing', icon: '📊' },
  { id: 'data-science', name: 'Data Science', icon: '📈' },
  { id: 'languages', name: 'Languages', icon: '🌍' },
];

interface InterestSelectorProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
}

export function InterestSelector({ selectedInterests, onChange }: InterestSelectorProps) {
  const toggleInterest = (interestId: string) => {
    const newSelection = selectedInterests.includes(interestId)
      ? selectedInterests.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    onChange(newSelection);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select your interests (at least one)
      </label>
      <div className="grid grid-cols-2 gap-3">
        {interests.map((interest) => (
          <button
            key={interest.id}
            type="button"
            onClick={() => toggleInterest(interest.id)}
            className={`
              flex items-center p-3 rounded-lg border-2 transition-all
              ${selectedInterests.includes(interest.id)
                ? 'border-blue-900 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-blue-200'
              }
            `}
          >
            <span className="text-xl mr-2">{interest.icon}</span>
            <span className="flex-1 text-left">{interest.name}</span>
            {selectedInterests.includes(interest.id) && (
              <Check className="w-5 h-5 text-blue-900" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
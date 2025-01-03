import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import * as Icons from "lucide-react";
import { Interest, InterestService } from "../../services/interest.ts";

interface InterestSelectorProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
}

const colorList = [
  "blue",
  "red",
  "green",
  "yellow",
  "purple",
  "orange",
  "cyan",
  "teal",
  "pink",
  "amber",
];

const getColorClasses = (isSelected: boolean) => {
  const baseClasses = "border-2 rounded-lg p-1 transition-all";
  return isSelected
    ? `${baseClasses} border-blue-500 bg-blue-50`
    : `${baseClasses} border-gray-200 hover:border-gray-300 hover:shadow-md`;
};

export function InterestSelector({
  selectedInterests,
  onChange,
}: InterestSelectorProps) {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterests = async () => {
      setIsLoading(true);
      const response = await InterestService.getAllInterests();

      if (response.success) {
        setInterests(response.data || []);
        setError(null);
      } else {
        setError(response.error || "Something went wrong");
      }

      setIsLoading(false);
    };

    fetchInterests();
  }, []);

  const toggleInterest = (interestId: string) => {
    const newSelection = selectedInterests.includes(interestId)
      ? selectedInterests.filter((id) => id !== interestId)
      : [...selectedInterests, interestId];
    onChange(newSelection);
  };

  if (isLoading) {
    return <p>Loading interests...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select your interests (at least one)
      </label>

      <div className="grid grid-cols-2 gap-3">
        {interests.map((interest) => {
          const IconComponent = Icons[interest.icon] || Icons.Heart;
          const isSelected = selectedInterests.includes(interest.id);

          return (
            <motion.button
              key={interest.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleInterest(interest.id)}
              className={getColorClasses(isSelected)}
            >
              <div className="flex items-center p-3  transition-all relative">
                <IconComponent
                  className={`w-6 h-6  ${
                    isSelected ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <h3
                  className={`flex-1 text-left ml-2 ${
                    isSelected ? "text-gray-900" : "text-gray-600"
                  }`}
                >
                  {interest.name}
                </h3>
                {isSelected && (
                  <Check className="w-5 h-5 text-blue-500 absolute right-3" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

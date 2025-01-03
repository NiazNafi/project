import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Interest, InterestService } from "../../services/interest.ts";
import * as Icons from "lucide-react";
interface InterestSelectorProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
}

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
  console.log(interests);
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
        {interests.map((interest) => (
          <button
            key={interest.id}
            type="button"
            onClick={() => toggleInterest(interest.id)}
            className={`flex items-center p-3 rounded-lg border-2 transition-all ${
              selectedInterests.includes(interest.id)
                ? "border-blue-900 bg-blue-50 text-blue-900"
                : "border-gray-200 hover:border-blue-200"
            }`}
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

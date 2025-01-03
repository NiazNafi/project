import { motion } from 'framer-motion';
import { Course } from '../../services/course';

interface Props {
  selectedInterest: string;
  onSelectInterest: (interest: string) => void;
  courses: Course[];
}

export function FilterTabs({ selectedInterest, onSelectInterest, courses }: Props) {
  const interests = ['all', ...new Set(courses.map(course => course.interestName))].filter(Boolean);

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-4 pb-4">
        {interests.map((interest, index) => (
          <motion.button
            key={interest}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectInterest(interest)}
            className={`
              px-6 py-2 rounded-full whitespace-nowrap transition-colors
              ${selectedInterest === interest
                ? 'bg-blue-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
              }
              shadow-sm
            `}
          >
            {interest === 'all' ? 'All Courses' : interest}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
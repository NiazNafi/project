import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Course } from '../../services/course';
import { CourseCard } from './CourseCard';

interface Props {
  courses: Course[];
}

export function ExploreSkills({ courses }: Props) {
  // Get unique interests from courses
  const interests = [...new Set(courses.map(c => c.interestName))];
  const [selectedInterest, setSelectedInterest] = useState<string>(interests[0] || '');

  // Update selected interest when courses change
  useEffect(() => {
    if (interests.length > 0 && !interests.includes(selectedInterest)) {
      setSelectedInterest(interests[0]);
    }
  }, [courses]);

  // If no new skills to explore, don't render the component
  if (courses.length === 0 || interests.length === 0) {
    return null;
  }

  const filteredCourses = courses.filter(c => c.interestName === selectedInterest);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore New Skills</h2>
      
      <div className="flex overflow-x-auto space-x-4 mb-8 pb-2">
        {interests.map((interest) => (
          <button
            key={interest}
            onClick={() => setSelectedInterest(interest)}
            className={`
              px-4 py-2 rounded-full whitespace-nowrap transition-colors
              ${selectedInterest === interest
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {interest}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedInterest}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
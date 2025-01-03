import { motion } from 'framer-motion';
import { Course } from '../../services/course';
import { CourseCard } from '../dashboard/CourseCard';

interface Props {
  courses: Course[];
}

export function CourseGrid({ courses }: Props) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">No courses found matching your criteria</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <CourseCard course={course} />
        </motion.div>
      ))}
    </div>
  );
}
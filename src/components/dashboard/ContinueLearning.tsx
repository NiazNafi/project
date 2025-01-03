import { motion } from 'framer-motion';
import { Course } from '../../services/course';
import { EnrolledCourseCard } from './EnrolledCourseCard';

interface Props {
  courses: Course[];
}

export function ContinueLearning({ courses }: Props) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <EnrolledCourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
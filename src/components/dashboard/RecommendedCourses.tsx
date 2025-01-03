import { motion } from 'framer-motion';
import { Course } from '../../services/course';
import { CourseCarousel } from './CourseCarousel';

interface Props {
  courses: Course[];
}

export function RecommendedCourses({ courses }: Props) {
  // Group courses by interest
  const coursesByInterest = courses.reduce((acc, course) => {
    const interest = course.interestName || 'Other';
    if (!acc[interest]) {
      acc[interest] = [];
    }
    acc[interest].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  // Filter out interests with less than 3 courses
  const validInterests = Object.entries(coursesByInterest)
    .filter(([_, courses]) => courses.length >= 3)
    .sort((a, b) => b[1].length - a[1].length); // Sort by number of courses

  if (validInterests.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
      <div className="space-y-12">
        {validInterests.map(([interest, courses], index) => (
          <motion.div
            key={interest}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 capitalize">
                {interest}
              </h3>
              <p className="text-gray-600 mt-1">
                {courses.length} courses available in {interest}
              </p>
            </div>
            
            <CourseCarousel courses={courses} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
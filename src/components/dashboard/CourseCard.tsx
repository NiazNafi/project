import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';

interface Props {
  course: Course;
  onEnrollment?: () => void;
}

export function CourseCard({ course, onEnrollment }: Props) {
  const navigate = useNavigate();

  const handleEnroll = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking enroll button
    try {
      const response = await EnrollmentService.enrollCourse(course.id);
      if (response.success) {
        toast.success('Successfully enrolled in course!');
        if (onEnrollment) {
          onEnrollment();
        }
      } else {
        toast.error(response.error?.message || 'Failed to enroll in course');
      }
    } catch (error) {
      toast.error('An error occurred while enrolling in the course');
    }
  };

  const handleCardClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-48">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-900">
          {course.level}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {course.instructor}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {course.students.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            {course.rating.toFixed(1)}
          </div>
        </div>
        <button 
          onClick={handleEnroll}
          className="w-full bg-blue-900 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
        >
          Start Now <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </motion.div>
  );
}
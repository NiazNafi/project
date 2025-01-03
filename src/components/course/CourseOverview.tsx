import { Clock, Users, BarChart, Award } from 'lucide-react';
import { CourseDetails } from '../../services/course';

interface CourseOverviewProps {
  course: CourseDetails;
}

export function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Clock className="w-6 h-6" />, label: 'Duration', value: course.duration },
          
          { icon: <BarChart className="w-6 h-6" />, label: 'Level', value: course.level },
          { icon: <Award className="w-6 h-6" />, label: 'Rating', value: course.rating.toFixed(1) },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-full text-blue-900">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">About This Course</h3>
        <div className="prose prose-sm max-w-none">
          {course.description}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Instructor</h3>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h4 className="text-lg font-medium">{course.instructor}</h4>
            <p className="text-gray-600">Course Instructor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
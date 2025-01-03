import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { CourseSetupService } from '../../../services/courseSetup';
import { useNavigate } from 'react-router-dom';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId?: string;
  courseData: any;
  chapters: any[];
}

export function PublishModal({ isOpen, onClose, courseId, courseData, chapters }: PublishModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePublish = async () => {
    try {
      if (!courseId) {
        throw new Error('Course ID is required');
      }

      const response = await CourseSetupService.publishCourse(courseId, {
        courseData: {
          ...courseData,
          status: 'published'
        },
        chapters
      });

      if (!response.success) {
        throw new Error(response.error?.message);
      }

      toast.success('Course published successfully!');
      onClose();
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message || 'Failed to publish course');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Publish Course</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-gray-600">
              Are you sure you want to publish this course? Once published, it will be visible to all students.
            </p>

            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Publishing will:</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Make the course visible in search results</li>
                <li>• Allow students to enroll</li>
                <li>• Save all your recent changes</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handlePublish}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Publish Course
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
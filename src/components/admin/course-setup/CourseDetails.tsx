import { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { CourseSetupData } from '../../../services/courseSetup';

interface CourseDetailsProps {
  initialData?: CourseSetupData | null;
  onUpdate: (data: Partial<CourseSetupData>) => void;
}

export function CourseDetails({ initialData, onUpdate }: CourseDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSave = () => {
    setIsEditing(false);
    if (title && description) {
      onUpdate({ title, description });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Course Details</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Edit2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course description"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(initialData?.title || '');
                setDescription(initialData?.description || '');
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Course Title</h3>
            <p className="mt-1 text-gray-900">{title || 'Add a title for your course'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700">Course Description</h3>
            <p className="mt-1 text-gray-900">{description || 'Add a description for your course'}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
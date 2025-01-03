import { useState, useEffect } from 'react';
import { Image as ImageIcon, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CourseImageProps {
  initialImage?: string;
  onUpdate: (imageUrl: string) => void;
}

export function CourseImage({ initialImage, onUpdate }: CourseImageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImage || '');

  useEffect(() => {
    if (initialImage) {
      setImageUrl(initialImage);
    }
  }, [initialImage]);

  const handleSave = () => {
    if (imageUrl) {
      onUpdate(imageUrl);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setImageUrl(initialImage || '');
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Course Image</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Edit2 className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Image Preview */}
        <div className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Course preview"
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
              }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Image URL</h3>
            <p className="mt-1 text-gray-900 break-all">
              {imageUrl || 'No image URL set'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
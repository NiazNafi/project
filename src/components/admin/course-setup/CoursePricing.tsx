import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface CoursePricingProps {
  onUpdate: () => void;
}

export function CoursePricing({ onUpdate }: CoursePricingProps) {
  const [price, setPrice] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    if (price) {
      onUpdate();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Pricing</h2>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course price"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
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
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-2xl font-semibold text-gray-900">
              {price ? `$${price}` : 'Not set'}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-blue-900 hover:text-blue-800"
          >
            Edit Price
          </button>
        </div>
      )}
    </motion.div>
  );
}
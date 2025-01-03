import { useState } from 'react';
import { Plus, Trash2, File } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResourceListProps {
  onUpdate: () => void;
}

export function ResourceList({ onUpdate }: ResourceListProps) {
  const [resources, setResources] = useState<{ name: string; type: string }[]>([]);

  const addResource = () => {
    setResources([...resources, { name: '', type: 'pdf' }]);
    onUpdate();
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
    onUpdate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Course Resources</h2>
        <button
          onClick={addResource}
          className="flex items-center space-x-2 text-blue-900 hover:text-blue-800"
        >
          <Plus className="w-5 h-5" />
          <span>Add Resource</span>
        </button>
      </div>

      <div className="space-y-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
          >
            <File className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={resource.name}
              onChange={(e) => {
                const newResources = [...resources];
                newResources[index].name = e.target.value;
                setResources(newResources);
                onUpdate();
              }}
              placeholder="Resource name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={resource.type}
              onChange={(e) => {
                const newResources = [...resources];
                newResources[index].type = e.target.value;
                setResources(newResources);
                onUpdate();
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="other">Other</option>
            </select>
            <button
              onClick={() => removeResource(index)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
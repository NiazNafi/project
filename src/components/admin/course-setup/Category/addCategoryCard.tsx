import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddCategoryCardProps {
  onOpenModal: () => void;
}

export function AddCategoryCard({ onOpenModal }: AddCategoryCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpenModal}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50/50 transition-all h-full flex flex-col items-center justify-center"
    >
      <div className="p-3 bg-blue-100 rounded-full mb-3">
        <Plus className="w-6 h-6 text-blue-900" />
      </div>
      <p className="text-gray-600 font-medium">Add Category</p>
    </motion.button>
  );
}
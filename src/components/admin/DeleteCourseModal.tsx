import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { CourseSetupService } from "../../services/courseSetup";
import { useNavigate } from "react-router-dom";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId?: string;
  setCourses: React.Dispatch<React.SetStateAction<any[]>>; // Prop to update courses
}

export function DeleteCourseModal({
  isOpen,
  onClose,
  courseId,
  setCourses,
}: DeleteModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      if (!courseId) {
        throw new Error("Course ID is required");
      }

      const response = await CourseSetupService.deleteCourse(courseId);

      if (response <= 0) {
        throw new Error("Failed to delete course. It may not exist.");
      }

      toast.success("Course deleted successfully!");
      onClose();

      // Update the course list by removing the deleted course
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );

      navigate("/admin");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete course");
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
            <h3 className="text-xl font-semibold text-gray-900">
              Delete Course
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-gray-600">
              Are you sure you want to delete this course? This action cannot be
              undone.
            </p>
          </div>

          <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Yes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

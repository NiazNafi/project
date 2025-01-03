import { useState, useEffect } from "react";
import { Plus, MessageSquare, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CourseStatus } from "../../types/course";
import { StatusBadge } from "./StatusBadge";
import { NewCourseModal } from "./NewCourseModal";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { SearchBar } from "./SearchBar";
import { AdminService, AdminCourse } from "../../services/admin";
import { v4 as uuidv4 } from "uuid";

export function CourseList() {
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, [searchQuery]);

  const loadCourses = async () => {
    try {
      const response = await AdminService.getCourses(searchQuery);
      if (response.success && response.data) {
        setCourses(response.data);
      } else {
        toast.error(response.error?.message || "Failed to load courses");
      }
    } catch (error) {
      toast.error("An error occurred while loading courses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCourse = (courseId: string) => {
    navigate(`/admin/courses/${courseId}/edit`, {
      state: { fromEditButton: true },
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsDeleteModalOpen(true);
  };

  const handleNewCourse = () => {
    const newCourseId = uuidv4();
    navigate(`/admin/courses/${newCourseId}/edit`, {
      state: { fromNewCourse: true },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
        <button
          onClick={() => setIsNewCourseModalOpen(true)}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Course</span>
        </button>
      </div>

      <div className="max-w-md">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search courses by title..."
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
                  </div>
                </td>
              </tr>
            ) : courses.length > 0 ? (
              courses.map((course) => (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {course.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {course.instructor}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={course.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button className="relative p-2 text-gray-400 hover:text-blue-900 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        {course.unreadFeedback > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {course.unreadFeedback}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => handleEditCourse(course.id)}
                        className="p-2 text-gray-400 hover:text-blue-900 transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 text-gray-400 hover:text-blue-900 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No courses found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <NewCourseModal
        isOpen={isNewCourseModalOpen}
        onClose={() => setIsNewCourseModalOpen(false)}
      />
      <DeleteCourseModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        courseId={selectedCourseId}
        setCourses={setCourses}
      />
    </div>
  );
}

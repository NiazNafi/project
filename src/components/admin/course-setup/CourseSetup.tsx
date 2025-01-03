import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { CourseDetails } from "./CourseDetails";
import { CourseImage } from "./CourseImage";
import { ChapterList } from "./ChapterList";
import { CategorySelector } from "./CategorySelector";
import { Sidebar } from "./Sidebar";
import { PublishModal } from "./PublishModal";
import { useCourseSetupData } from "../../../hooks/useCourseSetupData";
import { useSetupProgress } from "./hooks/useSetupProgress";

export function CourseSetup() {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const {
    courseData,
    isLoading,
    updateChapter,
    updateCourseDetails,
    addChapter,
    removeChapter,
  } = useCourseSetupData(courseId);
  console.log(courseData);
  const { progress, totalSteps, isComplete, updateProgress } = useSetupProgress(
    { courseData }
  );

  const handlePublish = () => {
    if (isComplete) {
      setIsPublishModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        progress={progress}
        totalSteps={totalSteps}
        isComplete={isComplete}
        onPublish={handlePublish}
      />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 px-6 py-8">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </button>

          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <CourseDetails
                initialData={courseData}
                onUpdate={async (data) => {
                  const success = await updateCourseDetails(data);
                  if (success) updateProgress("details");
                }}
              />
              <CourseImage
                initialImage={courseData?.imageUrl}
                onUpdate={async (imageUrl) => {
                  const success = await updateCourseDetails({ imageUrl });
                  if (success) updateProgress("image");
                }}
              />
              <CategorySelector
                initialCategory={courseData?.category}
                onUpdate={async (update) => {
                  if (update.type === "add") {
                    // Add new category to the global categories list
                    const updatedCategories = [...(courseData?.categories || []), update.category];
                    const success = await updateCourseDetails({ categories: updatedCategories });
                    if (success) updateProgress("category");
                  } else if (update.type === "select") {
                    // Update the selected category
                    const success = await updateCourseDetails({ category: update.categoryId });
                    if (success) updateProgress("category");
                  }
                }}
                categories={courseData?.categories}
              />
            </div>

            {/* Right Column */}
            <div>
              <ChapterList
                courseId={courseId!}
                chapters={courseData?.chapters || []}
                onUpdate={updateChapter}
                onAdd={addChapter}
                onRemove={removeChapter}
              />
            </div>
          </div>
        </main>
      </div>

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        courseId={courseId}
        courseData={courseData}
        chapters={courseData?.chapters || []}
      />
    </div>
  );
}

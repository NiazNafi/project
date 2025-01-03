import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { VideoSection } from "../components/course/layout/VideoSection";
import {
  TabNavigation,
  TabType,
} from "../components/course/layout/TabNavigation";
import { WhiteboardPanel } from "../components/course/layout/WhiteboardPanel";
import { CourseContent } from "../components/course/CourseContent";
import { CourseOverview } from "../components/course/CourseOverview";
import { CourseReviews } from "../components/course/CourseReviews";
import { CourseNotes } from "../components/course/CourseNotes";
import AiHelp from "../components/course/ai-help/AiHelpComponent";
import { CourseService, CourseDetails } from "../services/course";
import CourseViewNavbar from "../components/course/CourseViewNavbar";
import { useChat } from "../components/course/ai-help/hooks/useChat";
import AiMcq from "../components/course/AiMcq";

export function CourseView() {
  const { id: courseId } = useParams<{ id: string }>();
  const [isVideoMaximized, setIsVideoMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("content");
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isWhiteboardPopup, setIsWhiteboardPopup] = useState(false);
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const { messages, isTyping, sendMessage } = useChat();

  useEffect(() => {
    if (courseId) {
      loadCourseDetails();
    }
  }, [courseId]);

  const loadCourseDetails = async () => {
    try {
      const details = await CourseService.getCourseDetails(courseId!);
      console.log(details);
      if (details) {
        setCourseDetails(details);
      } else {
        toast.error("Course not found");
      }
    } catch (error) {
      toast.error("Error loading course details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhiteboardClose = () => {
    setIsWhiteboardOpen(false);
    setIsWhiteboardPopup(false);
  };

  const handleWhiteboardMaximize = () => {
    setIsWhiteboardOpen(false);
    setIsWhiteboardPopup(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Course not found</div>
      </div>
    );
  }

  const currentChapter = courseDetails.chapters[currentChapterIndex];
  const handleChapterIdxChange = (index: number) => {
    setCurrentChapterIndex(index);
    // setMessages([
    //   {
    //     id: "1",
    //     content: `Anything you need for this ${courseDetails.chapters[index].title}?`,
    //     sender: "ai",
    //     timestamp: new Date(),
    //   },
    // ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseViewNavbar courseTitle={courseDetails.title} />
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 ${isVideoMaximized ? "h-screen" : ""}`}>
          <VideoSection
            key={currentChapterIndex}
            isMaximized={isVideoMaximized}
            onToggleMaximize={() => setIsVideoMaximized(!isVideoMaximized)}
            link={currentChapter?.videoLink}
          />

          {!isVideoMaximized && (
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {courseDetails.chapters[currentChapterIndex].title}
              </h1>

              <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="mt-6">
                {activeTab === "overview" && (
                  <CourseOverview course={courseDetails} />
                )}
                {activeTab === "content" && (
                  <CourseContent
                    chapters={courseDetails.chapters}
                    currentChapterIndex={currentChapterIndex}
                    onChapterSelect={setCurrentChapterIndex}
                    handleChapterIdxChange={handleChapterIdxChange}
                  />
                )}
                {activeTab === "notes" && (
                  <CourseNotes
                    key={currentChapterIndex}
                    courseChapterText={
                      courseDetails.chapters[currentChapterIndex]
                        .textNote as string
                    }
                  />
                )}
                {activeTab === "reviews" && <CourseReviews />}
                {activeTab === "MCQ" && <AiMcq 
                chapterText={
                  courseDetails.chapters[currentChapterIndex]
                    .textNote as string
                }
                />}
                {activeTab === "ai" && (
                  <AiHelp
                    key={currentChapterIndex}
                    messages={messages}
                    isTyping={isTyping}
                    sendMessage={sendMessage}
                    courseChapterText={
                      courseDetails.chapters[currentChapterIndex]
                        .textNote as string
                    }
                  />
                )}
                
              </div>
            </div>
          )}
        </div>

        <WhiteboardPanel
          isOpen={isWhiteboardOpen || isWhiteboardPopup}
          onToggle={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
          isPopup={isWhiteboardPopup}
          onClose={handleWhiteboardClose}
          onMaximize={handleWhiteboardMaximize}
        />
      </div>
    </div>
  );
}

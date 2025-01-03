import { useNavigate } from 'react-router-dom';
import { Plus, GripVertical, Edit2, Trash2 } from 'lucide-react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { useCourseSetup } from '../../../contexts/CourseSetupContext';
import { ChapterData } from '../../../services/courseSetup';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

interface ChapterListProps {
  courseId: string;
  chapters: ChapterData[];
  onUpdate: (chapterId: string, data: Partial<ChapterData>) => void;
  onAdd: (chapter: ChapterData) => void;
  onRemove: (chapterId: string) => void;
}

export function ChapterList({ courseId, chapters, onUpdate, onAdd, onRemove }: ChapterListProps) {
  const { courseData } = useCourseSetup();
  const dragControls = useDragControls();
  
  const navigate = useNavigate();
  // Initialize state with the chapters prop
  const [chapterList, setChapterList] = useState<ChapterData[]>(chapters);
  

  const handleReorder = (newOrder: ChapterData[]) => {
    setChapterList(newOrder);
    // Optionally, update the order in the parent component or backend
    newOrder.forEach((chapter, index) => {
      onUpdate(chapter.id, { order: index + 1 });
    });
  };
  
  const handleAddChapter = () => {
    const newChapter = { id: uuidv4(), title: 'New Chapter', video_link: '', text_note: '', order: chapters.length + 1 };
    onAdd(newChapter);
    setChapterList([...chapterList, newChapter]);
    navigate(`/admin/courses/${courseId}/chapters/${newChapter.id}`);
  };
  const handleRemoveChapter = (chapterId: string) => {
    const updatedChapters = chapterList.filter((chapter: ChapterData) => chapter.id !== chapterId);
    setChapterList(updatedChapters);
    onRemove(chapterId);
  };

  const handleEditChapter = (chapter: ChapterData) => {
    navigate(`/admin/courses/${courseId}/chapters/${chapter.id}`, {
      state: { chapter }
    });
  };
  const updateChapter = (chapterId: string, data: Partial<ChapterData>) => {
    const updatedChapters = chapterList.map((chapter: ChapterData) =>
      chapter.id === chapterId ? { ...chapter, ...data } : chapter
    );
    setChapterList(updatedChapters);
    onUpdate(chapterId, data);
  };


  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Chapters</h2>
        <button
          onClick={handleAddChapter}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Chapter</span>
        </button>
      </div>
      
      {chapters.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">No chapters yet. Click "Add Chapter" to get started.</p>
        </div>
      )}

      <Reorder.Group axis="y" values={chapterList} onReorder={handleReorder}>
        <div className="space-y-4">
          {chapterList.map((chapter) => (
            <Reorder.Item
              key={chapter.id}
              value={chapter}
              dragListener={false}
              dragControls={dragControls}
            >
              <motion.div
                className="border border-gray-200 rounded-lg p-4 bg-white"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center space-x-4">
                  <button
                    className="cursor-move"
                    onPointerDown={(e) => dragControls.start(e)}
                  >
                    <GripVertical className="w-5 h-5 text-gray-400" />
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{chapter.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEditChapter(chapter)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleRemoveChapter(chapter.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </div>
      </Reorder.Group>

    </div>
  );
}
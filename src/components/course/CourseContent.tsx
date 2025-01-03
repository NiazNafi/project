import { ChevronDown, Play, CheckCircle } from 'lucide-react';
import { ChapterDetails } from '../../services/course';

interface CourseContentProps {
  chapters: ChapterDetails[];
  currentChapterIndex: number;
  onChapterSelect: (index: number) => void;
  handleChapterIdxChange: (index: number) => void
}

export function CourseContent({ 
  chapters,
  currentChapterIndex,
  onChapterSelect
  ,handleChapterIdxChange
}: CourseContentProps) {
  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <div 
          key={chapter.id} 
          className="bg-white rounded-lg shadow-sm"
        >
          <button
            onClick={() => {onChapterSelect(index)
              handleChapterIdxChange(index)
            }}
            className={`w-full flex items-center justify-between p-4 ${
              currentChapterIndex === index ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              {currentChapterIndex === index ? (
                <Play className="w-5 h-5 text-blue-900" />
              ) : (
                <CheckCircle className="w-5 h-5 text-gray-400" />
              )}
              <h3 className="text-lg font-medium">
                {chapter.title}
              </h3>
            </div>
          </button>
          
          {/* {currentChapterIndex === index && chapter.textNote && (
            <div className="p-4 pt-0">
              <div className="mt-4 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: chapter.textNote }}
              />
            </div>
          )} */}
        </div>
      ))}
      
    </div>
  );
}
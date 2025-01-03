import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChapterForm } from './ChapterForm';
import { ChapterActions } from './ChapterActions';
import { ChapterData } from '../../../../services/courseSetup';
import { useCourseSetupData } from '../../../../hooks/useCourseSetupData';

export function ChapterDetails() {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const chapterData = location.state?.chapter as ChapterData;

  const [title, setTitle] = useState(chapterData?.title || '');
  const [videoLink, setVideoLink] = useState(chapterData?.video_link || '');
  const [textNote, setTextNote] = useState(chapterData?.text_note || '');
  const { saveChapter } = useCourseSetupData(courseId);

  useEffect(() => {
    if (chapterData) {
      setTitle(chapterData.title);
      setVideoLink(chapterData.video_link);
      setTextNote(chapterData.text_note);
    }
  }, [chapterData]);

  const handleSave = async () => {
    const updatedChapterData = {
      title,
      video_link: videoLink,
      text_note: textNote,
    };

    const success = await saveChapter(chapterId, updatedChapterData);
    if (success) {
      navigate(`/admin/courses/${courseId}/edit`);
    }
  };

  const handleCancel = () => {
    navigate(`/admin/courses/${courseId}/edit`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleCancel}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course Setup
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            {chapterId ? 'Edit Chapter' : 'New Chapter'}
          </h2>

          <ChapterForm
            title={title}
            videoLink={videoLink}
            textNote={textNote}
            onTitleChange={(e) => setTitle(e.target.value)}
            onVideoLinkChange={(e) => setVideoLink(e.target.value)}
            onTextNoteChange={(value: string) => setTextNote(value)}
          />

          <ChapterActions onSave={handleSave} onCancel={handleCancel} />
        </motion.div>
      </div>
    </div>
  );
}
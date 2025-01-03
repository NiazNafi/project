import { ChangeEvent, useState, useEffect } from 'react';
import { Play, AlertCircle } from 'lucide-react';
import { RichTextEditor } from '../../../editor/RichTextEditor';
import { Link } from 'react-router-dom';
interface ChapterFormProps {
  title: string;
  videoLink: string;
  textNote: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onVideoLinkChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTextNoteChange: (content: string) => void;
}

export function ChapterForm({
  title,
  videoLink,
  textNote,
  onTitleChange,
  onVideoLinkChange,
  onTextNoteChange
}: ChapterFormProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoLink) {
      try {
        const url = new URL(videoLink);
        if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
          const videoId = getYoutubeVideoId(videoLink);
          if (videoId) {
            setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
            setError(null);
          } else {
            setError('Invalid YouTube URL');
            setThumbnailUrl(null);
          }
        } else if (url.hostname.includes('vimeo.com')) {
          setError('Vimeo thumbnails coming soon');
          setThumbnailUrl(null);
        } else {
          setError('Only YouTube and Vimeo links are supported');
          setThumbnailUrl(null);
        }
      } catch {
        setError('Invalid URL');
        setThumbnailUrl(null);
      }
    } else {
      setThumbnailUrl(null);
      setError(null);
    }
  }, [videoLink]);

  const getYoutubeVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chapter Title
        </label>
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter chapter title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Video Link
        </label>
        <input
          type="url"
          value={videoLink}
          onChange={onVideoLinkChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter YouTube or Vimeo URL"
        />
        
        {/* Video Preview */}
        {videoLink && (
          <div className="mt-4">
            {thumbnailUrl ? (
              <div className="relative group">
                <img
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className="w-full aspect-video object-cover rounded-lg"
                  onError={() => {
                    setError('Could not load thumbnail');
                    setThumbnailUrl(null);
                  }}
                />
                <Link to={videoLink} target="_blank" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-16 h-16 text-white" />
                </Link>
              </div>
            ) : error && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chapter Content
        </label>
        <RichTextEditor
          content={textNote}
          onChange={onTextNoteChange}
          placeholder="Enter chapter content, notes, or description..."
        />
      </div>
    </div>
  );
}
import { YouTubePlayer } from '../video/YouTubePlayer';
import { toast } from 'react-hot-toast';

interface VideoPlayerProps {
  videoUrl: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const handleError = (error: string) => {
    toast.error(error);
  };

  return (
    <div className="w-full h-full">
      <YouTubePlayer
        videoUrl={videoUrl}
        onError={handleError}
      />
    </div>
  );
}
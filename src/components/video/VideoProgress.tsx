import { useRef } from 'react';
import { formatTime } from '../../utils/videoUtils';

interface VideoProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function VideoProgress({ currentTime, duration, onSeek }: VideoProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    onSeek(percentage * duration);

    console.log('percentage video dekhese: ',percentage)
  };

  return (
    <div 
      ref={progressRef}
      onClick={handleClick}
      className="group relative h-1 bg-white/30 cursor-pointer mb-4"
    >
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-full bg-red-600"
        style={{ width: `${(currentTime / duration) * 100}%` }}
      />
      
      {/* Hover preview */}
      <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100">
        <div className="absolute -top-8 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
}
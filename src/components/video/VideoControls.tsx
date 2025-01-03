import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { VolumeSlider } from './VolumeSlider';
import { formatTime } from '../../utils/videoUtils';

interface VideoControlsProps {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime?: number;
  duration?: number;
  onPlay: () => void;
  onVolumeChange: (volume: number) => void;
  onMute: () => void;
}

export function VideoControls({
  isPlaying,
  volume,
  isMuted,
  currentTime = 0,
  duration = 0,
  onPlay,
  onVolumeChange,
  onMute
}: VideoControlsProps) {
  return (
    <div className="flex items-center space-x-4 text-white">
      <button
        onClick={onPlay}
        className="p-2 hover:bg-white/20 rounded-full transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </button>

      <div className="flex items-center space-x-2">
        <button
          onClick={onMute}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
        <VolumeSlider
          value={isMuted ? 0 : volume}
          onChange={onVolumeChange}
        />
      </div>

      <div className="text-sm">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
}
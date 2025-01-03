import { useEffect, useRef, useState } from 'react';
import { VideoControls } from './VideoControls';
import { VideoProgress } from './VideoProgress';
import { getYouTubeVideoId } from '../../utils/videoUtils';

interface YouTubePlayerProps {
  videoUrl: string;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubePlayer({ videoUrl, onError }: YouTubePlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (document.querySelector('script[src*="youtube.com/iframe_api"]')) return;
      
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    };

    if (!window.YT) {
      loadYouTubeAPI();
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoUrl]);

  const initializePlayer = () => {
    const videoId = getYouTubeVideoId(videoUrl);
    if (!videoId) {
      onError?.('Invalid YouTube URL');
      return;
    }

    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      playerVars: {
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        origin: window.location.origin
      },
      events: {
        onReady: () => {
          setIsReady(true);
          setDuration(playerRef.current.getDuration());
        },
        onStateChange: (event: any) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        },
        onError: () => {
          onError?.('Error loading video');
        }
      }
    });
  };

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        if (playerRef.current) {
          setCurrentTime(playerRef.current.getCurrentTime());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const handleSeek = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time);
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      
      {isReady && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <VideoProgress
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
          />
          <VideoControls
            isPlaying={isPlaying}
            volume={volume}
            isMuted={isMuted}
            currentTime={currentTime}
            duration={duration}
            onPlay={handlePlay}
            onVolumeChange={handleVolumeChange}
            onMute={handleMute}
          />
        </div>
      )}
    </div>
  );
}
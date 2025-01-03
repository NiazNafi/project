export function getYouTubeVideoId(url: string): string | null {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  }
  
  export function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    if (hours > 0) {
      return `${hours}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    }
    return `${minutes}:${padZero(remainingSeconds)}`;
  }
  
  function padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
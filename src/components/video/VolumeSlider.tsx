interface VolumeSliderProps {
    value: number;
    onChange: (value: number) => void;
  }
  
  export function VolumeSlider({ value, onChange }: VolumeSliderProps) {
    return (
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, white ${value}%, rgba(255,255,255,0.3) ${value}%)`
        }}
      />
    );
  }
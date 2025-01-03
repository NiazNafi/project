import { X, Pencil, Maximize2 } from 'lucide-react';
import { Whiteboard } from '../Whiteboard';

interface WhiteboardPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  isPopup?: boolean;
  onClose?: () => void;
  onMaximize?: () => void;
}

export function WhiteboardPanel({ 
  isOpen, 
  onToggle, 
  isPopup = false, 
  onClose,
  onMaximize
}: WhiteboardPanelProps) {
  if (isPopup && isOpen) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-[800px] h-[600px] relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close whiteboard"
          >
            <X className="w-5 h-5" />
          </button>
          <Whiteboard />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-white p-3 shadow-lg rounded-l-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <Pencil className="w-5 h-5" />
        <span className="text-sm font-medium">Whiteboard</span>
      </button>

      <div
        className={`fixed top-1/2 -translate-y-1/2 right-0 transition-all duration-300 z-50 ${
          isOpen ? 'w-96 bg-white shadow-lg h-[600px]' : 'w-0'
        }`}
      >
        {isOpen && (
          <div className="relative h-full">
            <div className="absolute right-4 top-4 flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close whiteboard"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={onMaximize}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Maximize whiteboard"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
            <Whiteboard />
          </div>
        )}
      </div>
    </div>
  );
}
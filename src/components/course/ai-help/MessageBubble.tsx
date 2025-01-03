import { Bot } from 'lucide-react';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAi = message.sender === 'ai';

  return (
    <div className={`flex items-start space-x-3 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}>
      {isAi ? (
        <div className="p-2 bg-blue-100 rounded-lg">
          <Bot className="w-5 h-5 text-blue-900" />
        </div>
      ) : (
        <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center">
          <span className="text-white font-medium">Y</span>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isAi ? 'bg-gray-100' : 'bg-blue-900 text-white'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}
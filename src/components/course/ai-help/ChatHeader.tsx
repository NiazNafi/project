import { Bot, Maximize2 } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Bot className="w-5 h-5 text-blue-900" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI Learning Assistant</h3>
          <p className="text-sm text-gray-500">Ask me anything about the course</p>
        </div>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <Maximize2 className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
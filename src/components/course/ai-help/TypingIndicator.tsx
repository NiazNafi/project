export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 text-gray-500">
      <div className="flex space-x-1">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${dot * 0.2}s` }}
          />
        ))}
      </div>
      <span className="text-sm">AI is typing...</span>
    </div>
  );
}
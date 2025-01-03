interface ChapterActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export function ChapterActions({ onSave, onCancel }: ChapterActionsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-gray-600 hover:text-gray-900"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
}
interface EditorContentProps {
  placeholder?: string;
}

export function EditorContent({ placeholder }: EditorContentProps) {
  return placeholder ? (
    <div
      className="absolute top-[2.75rem] left-4 text-gray-400 pointer-events-none"
      data-placeholder={placeholder}
    />
  ) : null;
}
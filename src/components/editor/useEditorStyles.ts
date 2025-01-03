import { useMemo } from 'react';

export function useEditorStyles() {
  const editorStyles = useMemo(
    () => `
      relative
      prose prose-sm sm:prose
      max-w-none
      prose-headings:font-semibold
      prose-h1:text-2xl
      prose-h2:text-xl
      prose-p:my-2
      prose-ul:my-2
      prose-ol:my-2
      prose-li:my-0
      prose-code:px-1
      prose-code:py-0.5
      prose-code:bg-gray-100
      prose-code:rounded
      prose-code:before:content-none
      prose-code:after:content-none
    `,
    []
  );

  return { editorStyles };
}
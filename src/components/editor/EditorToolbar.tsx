import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading1,
  Heading2
} from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { LinkModal } from './LinkModal';
import { useState } from 'react';

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const handleLinkAdd = (url: string) => {
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
    setIsLinkModalOpen(false);
  };

  return (
    <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        icon={<Bold className="w-4 h-4" />}
        tooltip="Bold"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        icon={<Italic className="w-4 h-4" />}
        tooltip="Italic"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        icon={<Code className="w-4 h-4" />}
        tooltip="Code"
      />
      <div className="w-px h-6 bg-gray-200 mx-1" />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        icon={<Heading1 className="w-4 h-4" />}
        tooltip="Heading 1"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        icon={<Heading2 className="w-4 h-4" />}
        tooltip="Heading 2"
      />
      <div className="w-px h-6 bg-gray-200 mx-1" />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        icon={<List className="w-4 h-4" />}
        tooltip="Bullet List"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        icon={<ListOrdered className="w-4 h-4" />}
        tooltip="Numbered List"
      />
      <div className="w-px h-6 bg-gray-200 mx-1" />
      <ToolbarButton
        onClick={() => setIsLinkModalOpen(true)}
        isActive={editor.isActive('link')}
        icon={<LinkIcon className="w-4 h-4" />}
        tooltip="Add Link"
      />

      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onSubmit={handleLinkAdd}
      />
    </div>
  );
}
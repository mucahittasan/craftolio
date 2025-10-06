'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { Button } from './button';
import { cn } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
} from 'lucide-react';
import { useCallback } from 'react';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Start typing...',
  error = false,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'custom-bullet-list',
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'custom-ordered-list',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'custom-list-item',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn('focus:outline-none min-h-[120px] p-3'),
        'data-placeholder': placeholder,
      },
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        .ProseMirror h1 {
          font-size: 2rem !important;
          font-weight: 700 !important;
          line-height: 1.2 !important;
          margin: 1.5rem 0 1rem 0 !important;
        }
        .ProseMirror h2 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          line-height: 1.3 !important;
          margin: 1.25rem 0 0.75rem 0 !important;
        }
        .ProseMirror h3 {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          line-height: 1.4 !important;
          margin: 1rem 0 0.5rem 0 !important;
        }
        .ProseMirror h4 {
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          line-height: 1.4 !important;
          margin: 0.75rem 0 0.5rem 0 !important;
        }
        .custom-bullet-list {
          list-style-type: disc !important;
          margin: 0.5rem 0 !important;
          padding-left: 1.5rem !important;
        }
        .custom-ordered-list {
          list-style-type: decimal !important;
          margin: 0.5rem 0 !important;
          padding-left: 1.5rem !important;
        }
        .custom-list-item {
          margin: 0.25rem 0 !important;
          display: list-item !important;
        }
        .custom-list-item p {
          margin: 0 !important;
          display: block !important;
          list-style: none !important;
        }
        .custom-list-item p::marker {
          display: none !important;
        }
        .custom-list-item p::before {
          display: none !important;
        }
      `}</style>
      <div
        className={cn(
          'rounded-lg border',
          error && 'border-destructive',
          className,
        )}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b bg-muted/50 p-2">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant={editor.isActive('bold') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="h-8 w-8 p-0"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('italic') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="h-8 w-8 p-0"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('underline') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className="h-8 w-8 p-0"
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="h-8 w-8 p-0"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          {/* Text Alignment */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant={
                editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'
              }
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className="h-8 w-8 p-0"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={
                editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
              className="h-8 w-8 p-0"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant={
                editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'
              }
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className="h-8 w-8 p-0"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant={
                editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="h-8 w-8 p-0"
            >
              H1
            </Button>
            <Button
              type="button"
              variant={
                editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="h-8 w-8 p-0"
            >
              H2
            </Button>
            <Button
              type="button"
              variant={
                editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className="h-8 w-8 p-0"
            >
              H3
            </Button>
            <Button
              type="button"
              variant={
                editor.isActive('heading', { level: 4 }) ? 'default' : 'ghost'
              }
              size="sm"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className="h-8 w-8 p-0"
            >
              H4
            </Button>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant={editor.isActive('link') ? 'default' : 'ghost'}
              size="sm"
              onClick={setLink}
              className="h-8 w-8 p-0"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="max-h-[300px] min-h-[120px] overflow-y-auto">
          <EditorContent
            editor={editor}
            placeholder={placeholder}
            className="focus-within:outline-none"
          />
        </div>
      </div>
    </>
  );
}

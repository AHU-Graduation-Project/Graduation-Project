import { useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Code from "@tiptap/extension-code";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  FlipVertical,
  Undo,
  Redo,
  Code2,
  Highlighter,
} from "lucide-react";
import { Markdown } from "tiptap-markdown";

// Update MenuButton component styles to handle dark mode
const MenuButton = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
      active ? "text-blue-600 bg-blue-50 dark:bg-blue-900/50" : "text-gray-600 dark:text-gray-300"
    }`}
  >
    {children}
  </button>
);

interface EditorProps {
  description: string;
  setDescription: (value: string) => void;
}

export default function Editor({ description, setDescription }: EditorProps) {
  // const [content, setContent] = useState("");
  const editor = useEditor({
    extensions: [
      Markdown,

      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4",
          },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start writing something amazing...",
      }),
      Typography,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: description, // Initialize with the description prop
    onUpdate: ({ editor }) => {
      const markdownContent = editor.storage.markdown.getMarkdown();
      setDescription(markdownContent); // Update parent state with the new content
      console.log(description);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="w-full  mx-auto">
      <div className="bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-100 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex flex-wrap gap-1 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic size={18} />
          </MenuButton>
          <MenuButton onClick={addLink} active={editor.isActive("link")}>
            <LinkIcon size={18} />
          </MenuButton>

          <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <Heading1 size={18} />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
          >
            <Heading2 size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <FlipVertical size={18} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setCode().run()}>
            <Code2 size={18} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            <Quote size={18} />
          </MenuButton>

          <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
          <MenuButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={18} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={18} />
          </MenuButton>
        </div>
        <div className="p-4 min-h-[200px] max-h-[200px] overflow-y-scroll">
          <EditorContent editor={editor} />
        </div>
      </div>

      {editor && (
        <BubbleMenu
          className="bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
          >
            <UnderlineIcon size={16} />
          </MenuButton>
          <MenuButton onClick={addLink} active={editor.isActive("link")}>
            <LinkIcon size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive("highlight")}
          >
            <Highlighter size={16} />
          </MenuButton>
        </BubbleMenu>
      )}
    </div>
  );
}

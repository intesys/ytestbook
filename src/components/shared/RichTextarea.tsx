import { Text } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import "@mantine/tiptap/styles.css";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MimeMatcher from "mime-matcher";
import { Dispatch, FC, SetStateAction } from "react";
import { IMAGE_PASTE_ALLOWED_MIME_TYPES } from "../../lib/constants/generic.ts";
import { compressImage } from "../../lib/helpers/compressImage.ts";
import { convertBase64 } from "../../lib/helpers/convertBase64";
import { RichTextEditorImageControl } from "./RichTextEditorControls/RichTextEditorImageControl";

export const RICHTEXTAREA_LINKEDITORDROPDOWN_CLASS = "rta-link-dropdown";

export const RichTextarea: FC<{
  label?: string;
  value?: string;
  onChange: Dispatch<SetStateAction<string>>;
}> = ({ label, value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "rta-image",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    enablePasteRules: false,
  });

  editor?.setOptions({
    editorProps: {
      handlePaste: (_view, event) => {
        const applyImagePast = async () => {
          const clipboardItems = await navigator.clipboard.read();
          const clipboardItem = clipboardItems[0];
          const { types } = clipboardItem;
          const type = types[0];
          const blob = await clipboardItems[0].getType(type);

          // Check if paste file type is allowed (is Image)
          if (!new MimeMatcher(...IMAGE_PASTE_ALLOWED_MIME_TYPES).match(type)) {
            return;
          }

          // Compress and base64 the image
          const compressedFile = await compressImage(blob);
          const base64 = (await convertBase64(compressedFile)) as string;

          // Insert image into editor
          editor.chain().focus().setImage({ src: base64 }).run();
        };

        // If paste has files try to import the image
        if (
          event.clipboardData?.files.length &&
          event.clipboardData?.files.length > 0
        ) {
          applyImagePast();
          return true; // block default pasting
        }
      },
    },
  });

  return (
    <div>
      {label && (
        <Text size="sm" fw={500}>
          {label}
        </Text>
      )}
      <RichTextEditor
        editor={editor}
        classNames={{
          linkEditorDropdown: RICHTEXTAREA_LINKEDITORDROPDOWN_CLASS,
        }}
      >
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditorImageControl editor={editor} />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </div>
  );
};

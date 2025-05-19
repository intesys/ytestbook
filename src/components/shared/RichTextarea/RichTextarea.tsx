import { InputError, Text } from "@mantine/core";
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
import { EditorView } from "prosemirror-view";
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react";
import { IMAGE_INSERT_ALLOWED_MIME_TYPES } from "../../../lib/constants/generic.ts";
import { compressImage } from "../../../lib/helpers/compressImage.ts";
import { convertBase64 } from "../../../lib/helpers/convertBase64.ts";
import { RichTextEditorImageControl } from "../RichTextEditorControls/RichTextEditorImageControl.tsx";

export const RICHTEXTAREA_LINKEDITORDROPDOWN_CLASS = "rta-link-dropdown";

export const RichTextarea: FC<{
  label?: string;
  value?: string;
  error?: string;
  onChange: Dispatch<SetStateAction<string>>;
  resetUtilities?: {
    isToReset: boolean;
    setAsResetted: () => void;
  };
}> = ({ label, value, error, resetUtilities, onChange }) => {
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

  useEffect(() => {
    if (resetUtilities?.isToReset) {
      editor?.commands.setContent(value ?? "");
      resetUtilities.setAsResetted();
    }
  }, [editor?.commands, resetUtilities, value]);

  const insertImageIntoEditor = useCallback(
    async (
      file: File | Blob,
      mimeType: string,
      event: DragEvent | ClipboardEvent,
      view: EditorView,
    ) => {
      if (!editor) {
        return;
      }

      // Check if paste file type is allowed (is Image)
      if (
        !new MimeMatcher(...IMAGE_INSERT_ALLOWED_MIME_TYPES).match(mimeType)
      ) {
        return;
      }

      // Compress and base64 the image
      const compressedFile = await compressImage(file);
      const base64 = (await convertBase64(compressedFile)) as string;

      // compute position if Paste or Drop events
      let position: number | undefined = undefined;
      if (event.type === "paste" && event.currentTarget instanceof Node) {
        position = view.posAtDOM(event.currentTarget, 0);
      }
      if (event.type === "drop" && event instanceof DragEvent) {
        const coordinates = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        position = coordinates?.pos;
      }

      // If there are coordinates insert it, otherwise do default insert
      if (position) {
        const { schema } = view.state;
        const node = schema.nodes.image.create({ src: base64 }); // creates the image element
        const transaction = view.state.tr.insert(position, node); // places it in the correct position
        view.dispatch(transaction);
        return;
      }

      // Default insert image into editor
      editor.chain().focus().setImage({ src: base64 }).run();
    },
    [editor],
  );

  editor?.setOptions({
    editorProps: {
      handleDrop: function (view, event, _slice, moved) {
        // Insert image only if dragging a file and not a element move inside the editor
        if (!moved && event?.dataTransfer?.files[0]) {
          const file = event.dataTransfer.files[0];
          insertImageIntoEditor(file, file.type, event, view);
          return true;
        }
      },
      handlePaste: (view, event) => {
        const getAndInsertImage = async () => {
          // Retrieve file from clipboard
          const clipboardItems = await navigator.clipboard.read();
          const clipboardItem = clipboardItems[0];
          const { types } = clipboardItem;
          const type = types[0];
          const blob = await clipboardItems[0].getType(type);

          // Insert image into editor
          insertImageIntoEditor(blob, type, event, view);
        };

        // If paste has files try to import the image
        if (
          event.clipboardData?.files.length &&
          event.clipboardData?.files.length > 0
        ) {
          getAndInsertImage();
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
      {error ? <InputError>{error}</InputError> : null}
    </div>
  );
};

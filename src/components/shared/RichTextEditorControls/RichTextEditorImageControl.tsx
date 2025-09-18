import { useCallback } from "react";
import { IconPhoto } from "@tabler/icons-react";
import { Editor } from "@tiptap/react";
import { modals } from "@mantine/modals";
import { RichTextEditor } from "@mantine/tiptap";
import { Modals } from "@/components/modals/modals.ts";

interface RichTextEditorImageControlProps {
  editor: Editor | null;
}
export const RICHTEXTAREA_ADD_IMAGE_MODAL_CLASS = "rta-add-image";

export const RichTextEditorImageControl = ({
  editor,
}: RichTextEditorImageControlProps) => {
  const appendImage = useCallback(
    (url: string) => {
      if (url) {
        editor?.chain().focus().setImage({ src: url }).run();
      }
    },
    [editor]
  );

  const addImageHandler = useCallback(() => {
    modals.openContextModal({
      modal: Modals.InsertImageModal,
      title: "Insert image",
      centered: true,
      className: RICHTEXTAREA_ADD_IMAGE_MODAL_CLASS,
      innerProps: {
        handleSubmit: (value) => {
          appendImage(value);
        },
      },
    });
  }, [appendImage]);

  return (
    <RichTextEditor.Control
      onClick={addImageHandler}
      aria-label="Insert image"
      title="Insert image"
    >
      <IconPhoto stroke={1.5} size="1rem" />
    </RichTextEditor.Control>
  );
};

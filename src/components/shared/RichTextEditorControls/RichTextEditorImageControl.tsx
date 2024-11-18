import { modals } from "@mantine/modals";
import { RichTextEditor } from "@mantine/tiptap";
import { IconPhoto } from "@tabler/icons-react";
import { Editor } from "@tiptap/react";
import { useCallback } from "react";
import { Modals } from "../../modals/modals.ts";

interface IProps {
  editor: Editor | null;
}
export const RICHTEXTAREA_ADD_IMAGE_MODAL_CLASS = "rta-add-image";

export const RichTextEditorImageControl = ({ editor }: IProps) => {
  /*TODO: Move in an external component */
  const appendImage = useCallback(
    (url: string) => {
      if (url) {
        editor?.chain().focus().setImage({ src: url }).run();
      }
    },
    [editor],
  );

  const addImageHandler = useCallback(() => {
    modals.openContextModal({
      modal: Modals.PromptModal,
      title: "Attach an image",
      centered: true,
      className: RICHTEXTAREA_ADD_IMAGE_MODAL_CLASS,
      innerProps: {
        inputProps: {
          label: "Image URL",
          placeholder: "Please enter an image URL",
        },
        validation: (value) => {
          const trimmedValue = value.trim();
          if (trimmedValue.length <= 10) {
            return "Value too short";
          }
          if (!trimmedValue.startsWith("https://")) {
            return "Should be a valid URL";
          }
          return undefined;
        },
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

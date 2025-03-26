import { RICHTEXTAREA_LINKEDITORDROPDOWN_CLASS } from "../../components/shared/RichTextarea/RichTextarea.tsx";
import { RICHTEXTAREA_ADD_IMAGE_MODAL_CLASS } from "../../components/shared/RichTextEditorControls/RichTextEditorImageControl.tsx";

/**
 * Checks if Link Popup of editable html text is visibile
 * @returns
 */

export const isEditableHtmlTextPopupVisible = () => {
  const linkEditDropdown = document.querySelector(
    `.${RICHTEXTAREA_LINKEDITORDROPDOWN_CLASS}`,
  );
  const addImageModal = document.querySelector(
    `.${RICHTEXTAREA_ADD_IMAGE_MODAL_CLASS}`,
  );

  return linkEditDropdown !== null || addImageModal?.hasChildNodes();
};

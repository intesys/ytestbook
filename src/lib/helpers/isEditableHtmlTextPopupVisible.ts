import { RICHTEXTAREA_LINKEDITORDROPDOWN_CLASS } from "../../components/shared/RichTextarea";

/**
 * Checks if Link Popup of editable html text is visibile
 * @returns
 */
export const isEditableHtmlTextPopupVisible = () =>
  document.querySelector(`.${RICHTEXTAREA_LINKEDITORDROPDOWN_CLASS}`) !== null;

/**
 * Checks if Link Popup of editable html text is visibile
 * @returns
 */
export const isEditableHtmlTextPopupVisible = () => {
  return (
    document.querySelector(".mantine-RichTextEditor-linkEditorDropdown") !==
    null
  );
};

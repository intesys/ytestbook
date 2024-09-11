/**
 * Copies a text into the user's clipboard
 *
 * @param {string} text - text to be copied
 */

export const copyTextToClipboard = (text: string | undefined) => {
  text && navigator.clipboard.writeText(text);
};

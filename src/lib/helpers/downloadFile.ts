export const downloadFile = (fileContent: string, filename: string) => {
  const link = document.createElement("a");
  const file = new Blob([fileContent], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

import { resolve } from "path";

export const base64toBlob = (base64Data: string, contentType: string): Blob => {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = btoa(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
};

export const downloadDocumento = (
  stream: string,
  contentType: string,
  fileName: string,
  fileExtension?: string
): void => {
  // 1. Convert the data into 'blob'
  const blob =
    contentType === "application/json"
      ? stream
      : base64toBlob(stream, contentType);
  // 2. Create blob link to download
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  const extension = fileExtension ? `.${fileExtension}` : "";
  link.setAttribute("download", `${fileName}${extension}`);
  // 3. Append to html page
  document.body.appendChild(link);
  // 4. Force download
  link.click();
  // 5. Clean up and remove the link
  link!.parentNode!.removeChild(link);
};

export const fileReader = (file: any): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      fileReader.result && resolve(JSON.parse(fileReader.result as string));
    };
    fileReader.onerror = (error: any) => reject(error);
    if (file !== undefined) fileReader.readAsText(file);
  });
};

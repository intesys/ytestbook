/**
 * Converts a File/Blob into a base64 string
 * @param file
 * @returns
 */
export const convertBase64 = (file: File | Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

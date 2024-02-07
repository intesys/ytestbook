import React from "react";
import { FileUploader } from "./FileUploader";

type Props = {
  handleCreateTestBook: ()=> void;
  onFileUpload: (file: File)=> void
}

export const UploadTextBook: React.FC<Props> = ({handleCreateTestBook,onFileUpload}) => {
  const handleFileUpload = (file: File) => {
    handleCreateTestBook()
    onFileUpload(file)
  }
  return <FileUploader onFileUpload={handleFileUpload}  />;
};

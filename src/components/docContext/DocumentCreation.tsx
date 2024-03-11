import { TDocumentCreationProps } from "./types";

export function DocumentCreation({ create }: TDocumentCreationProps) {
  return (
    <div>
      <h2>
        It was not possible to find a Document because you didn't declare a
        Document ID or the one you entered is not valid. Do you want to create a
        new document?
      </h2>
      <button onClick={create}>Create</button>
    </div>
  );
}

import { useState } from "react";

export const useRichTextAreaResetUtilities = () => {
  const [isToReset, setIsToReset] = useState(false);

  return {
    isToReset,
    setAsResetted: () => setIsToReset(false),
    reset: () => setIsToReset(true),
  };
};

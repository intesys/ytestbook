import { useContext } from "react";
import { DocContext } from "@/components/docContext/DocContext.tsx";

export function useDocContext() {
  return useContext(DocContext);
}

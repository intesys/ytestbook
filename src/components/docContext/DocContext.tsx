import { createContext } from "react";
import { TDocContextValue } from "./types";

export const DocContext = createContext<TDocContextValue>({
  docUrl: undefined,
  createDoc: () => null,
  findAndSetDoc: () => null,
});

import { useContext } from "react";
import { ServersContext } from "@/components/serversContext/serversContext.tsx";

export function useServersContext() {
  return useContext(ServersContext);
}

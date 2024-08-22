import { useParams } from "react-router";

export const useServerName = () => {
  const params = useParams();
  return params.serverName ?? "";
};

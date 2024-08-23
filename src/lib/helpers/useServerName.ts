import slugify from "slugify";
import { useParams } from "react-router";

export const useServerName = () => {
  const params = useParams();
  return slugify(params.serverName ?? "");
};

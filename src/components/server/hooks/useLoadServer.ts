import { Repo } from "@automerge/automerge-repo";
import { YtServer } from "../../serversContext/types";
import { useMemo } from "react";
import { useServerName } from "../../../lib/helpers/useServerName";
import {
  serversHandler,
  useServersContext,
} from "../../serversContext/serversContext";

type LoadServerStatus =
  | {
      status: "loading";
    }
  | { status: "not-found" }
  | {
      status: "loaded";
      server: YtServer;
      handler: Repo;
    };

export const useLoadServer = (): LoadServerStatus => {
  const serverName = useServerName();
  const { servers } = useServersContext();

  return useMemo(() => {
    if (!servers || !serverName) {
      return {
        status: "loading",
      };
    }

    const currentServer = servers[serverName];
    const handler = serverName ? serversHandler[serverName] : undefined;

    if (!currentServer || !handler) {
      return {
        status: "not-found",
      };
    }

    return {
      status: "loaded",
      server: currentServer,
      handler,
    };
  }, [serverName, servers]);
};

import { useMemo } from "react";
import { Repo } from "@automerge/automerge-repo";
import { useServersContext } from "@/components/serversContext/hooks/useServersContext.ts";
import { serversHandler } from "@/components/serversContext/serversContext";
import { YtServer } from "@/components/serversContext/types";
import { useServerName } from "@/lib/helpers/useServerName";

export enum LoadServerStatus {
  Loading = "loading",
  NotFound = "not-found",
  Loaded = "loaded",
}

type LoadServer =
  | {
      status: LoadServerStatus.Loading;
    }
  | { status: LoadServerStatus.NotFound }
  | {
      status: LoadServerStatus.Loaded;
      server: YtServer;
      handler: Repo;
    };

/**
 * Try to load server data
 * @returns {
 * status: The loading status
 * server: The server configuration
 * handler: The server automerge handler
 * }
 */
export const useLoadServer = (): LoadServer => {
  const serverName = useServerName();
  const { servers } = useServersContext();

  return useMemo(() => {
    if (!servers || !serverName) {
      return {
        status: LoadServerStatus.Loading,
      };
    }

    const currentServer = servers[serverName];
    const handler = serverName ? serversHandler[serverName] : undefined;

    if (!currentServer || !handler) {
      return {
        status: LoadServerStatus.NotFound,
      };
    }

    return {
      status: LoadServerStatus.Loaded,
      server: currentServer,
      handler,
    };
  }, [serverName, servers]);
};

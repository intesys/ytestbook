import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { useMemo } from "react";
import { Outlet } from "react-router";
import { useServerName } from "../../lib/helpers/useServerName";
import { DocProvider } from "../docContext/DocContext";
import {
  serversHandler,
  useServersContext,
} from "../serversContext/serversContext";

export const Server = () => {
  const serverName = useServerName();

  const { servers } = useServersContext();

  const server = useMemo(() => {
    return serverName ? servers[serverName] : undefined;
  }, [serverName, servers]);

  const handler = serverName ? serversHandler[serverName] : undefined;

  if (!handler) {
    return <>No handler</>;
  }

  console.log("🚀 ~ Server ~ repositoryIds:", server);
  return (
    <RepoContext.Provider value={handler}>
      <DocProvider docUrl={server?.repositoryIds[0]}>
        <Outlet />
      </DocProvider>
    </RepoContext.Provider>
  );
};

import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { useMemo } from "react";
import { Outlet } from "react-router";
import { useServerName } from "../../lib/helpers/useServerName";
import { DocProvider } from "../docContext/DocContext";
import {
  serversHandler,
  useServersContext,
} from "../serversContext/serversContext";
import { FullPageSpinner } from "../fullPageSpinner/FullPageSpinner";

export const Server = () => {
  const serverName = useServerName();

  const { servers } = useServersContext();

  const server = useMemo(() => {
    return serverName ? servers[serverName] : undefined;
  }, [serverName, servers]);

  const handler = serverName ? serversHandler[serverName] : undefined;

  if (!handler) {
    return <FullPageSpinner />;
  }

  return (
    <RepoContext.Provider value={handler}>
      <DocProvider docUrl={server?.repositoryIds[0]}>
        <Outlet />
      </DocProvider>
    </RepoContext.Provider>
  );
};

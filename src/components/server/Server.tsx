import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { useMemo } from "react";
import { Outlet, useParams } from "react-router";
import { DocProvider } from "../docContext/DocContext";
import {
  serversHandler,
  useServersContext,
} from "../serversContext/serversContext";

export const Server = () => {
  const params = useParams();

  const { servers } = useServersContext();

  const server = useMemo(() => {
    // const key Object.keys(servers).find((name) => {
    //   return name === params.serverName;
    // });

    return params.serverName ? servers[params.serverName] : undefined;
  }, [params.serverName, servers]);

  const handler = params["serverName"]
    ? serversHandler[params["serverName"]]
    : undefined;

  if (!handler) {
    return <>No handler</>;
  }

  return (
    <RepoContext.Provider value={handler}>
      <DocProvider docUrl={server?.repositoryId}>
        <Outlet />
      </DocProvider>
    </RepoContext.Provider>
  );
};

import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { Outlet, useParams } from "react-router";
import { DocProvider } from "../docContext/DocContext";
import { FullPageSpinner } from "../fullPageSpinner/FullPageSpinner";
import { NotFound } from "../notFound/NotFound";
import { useLoadServer } from "./hooks/useLoadServer";

export const Server = () => {
  const serverLoadStatus = useLoadServer();
  const params = useParams();

  // Check that a projectId has been passed
  if (!params.projectId) {
    return <NotFound />;
  }

  if (serverLoadStatus.status === "loading") {
    return <FullPageSpinner />;
  }

  if (serverLoadStatus.status === "not-found") {
    return <NotFound />;
  }

  return (
    <RepoContext.Provider value={serverLoadStatus.handler}>
      <DocProvider docUrl={serverLoadStatus.server?.repositoryIds[0]}>
        <Outlet />
      </DocProvider>
    </RepoContext.Provider>
  );
};

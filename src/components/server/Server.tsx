import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { Outlet, useParams } from "react-router";
import { DocProvider } from "../docContext/DocContext";
import { FullPageSpinner } from "../fullPageSpinner/FullPageSpinner";
import { NotFound } from "../notFound/NotFound";
import { LoadServerStatus, useLoadServer } from "./hooks/useLoadServer";
import ScrollToTop from "../shared/ScrollToTop";

export const Server = () => {
  const serverLoadStatus = useLoadServer();
  const params = useParams();

  // Check that a projectId has been passed
  if (!params.projectId) {
    return <NotFound />;
  }

  if (serverLoadStatus.status === LoadServerStatus.Loading) {
    return <FullPageSpinner />;
  }

  if (serverLoadStatus.status === LoadServerStatus.NotFound) {
    return <NotFound />;
  }

  const id = serverLoadStatus.server?.repositories?.at(0)?.id;

  return (
    <RepoContext.Provider value={serverLoadStatus.handler}>
      <DocProvider docUrl={id}>
        <ScrollToTop />
        <Outlet />
      </DocProvider>
    </RepoContext.Provider>
  );
};

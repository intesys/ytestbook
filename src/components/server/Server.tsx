import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { Outlet, useParams } from "react-router";
import { DocContextProvider } from "@/components/docContext/DocContextProvider.tsx";
import { FullPageSpinner } from "@/components/fullPageSpinner/FullPageSpinner";
import { NotFound } from "@/components/notFound/NotFound";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { LoadServerStatus, useLoadServer } from "./hooks/useLoadServer";

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

  return (
    <RepoContext.Provider value={serverLoadStatus.handler}>
      <DocContextProvider docUrl={serverLoadStatus.server?.repositoryIds[0]}>
        <ScrollToTop />
        <Outlet />
      </DocContextProvider>
    </RepoContext.Provider>
  );
};

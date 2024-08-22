import React, { useMemo } from "react";
import { repositoryHandler } from "../../lib/repositoryHandler/repositoryHandler";
import { useRepositoryHandler } from "../../lib/repositoryHandler/useRepositoryHandler";
import {
  serversHandler,
  useServersContext,
} from "../serversContext/serversContext";
import { Box, Button, Divider, Text, Title } from "@mantine/core";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { DocProvider, useDocContext } from "../docContext/DocContext";
import { ProjectList } from "./ProjectList";
import { Modals } from "../modals/modals";
import { Action } from "../action/Action";
import { Actions } from "./Actions";
import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";

// const r = new Repo({
//   // network: [new BrowserWebSocketClientAdapter(server.url)],
//   network: [],
//   storage: new IndexedDBStorageAdapter(),
// });

export const Repositories: React.FC = () => {
  // const servers = useMemo(() => repositoryHandler.getServers(), []);

  // const { servers } = useRepositoryHandler();

  const { servers } = useServersContext();

  console.log(servers);

  return (
    <div>
      {Object.entries(servers).map((server) => {
        const [name, repo] = server;
        console.log("🚀 ~ {Object.entries ~ repo:", repo);

        if (!repo) {
          return "";
        }

        return (
          <RepoContext.Provider
            value={serversHandler["offline"]}
            key={repo.name}
          >
            <Title order={2}>
              {repo.name}

              <Text size="sm">{repo.url}</Text>
            </Title>

            {/* <DocProvider docUrl={repo.repositoryId}> */}
            {repo.repositoryId ? <ProjectList repo={repo} /> : null}

            <Actions repo={repo} />
            {/* </DocProvider> */}

            <Divider my="lg" />
          </RepoContext.Provider>
        );
      })}
    </div>
  );
};

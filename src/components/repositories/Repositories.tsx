import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { Divider, Text, Title } from "@mantine/core";
import React from "react";
import {
  serversHandler,
  useServersContext,
} from "../serversContext/serversContext";
import { Actions } from "./Actions";
import { ProjectList } from "./ProjectList";

export const Repositories: React.FC = () => {
  const { servers } = useServersContext();

  // console.log("Repositories", servers);

  return (
    <div>
      {Object.values(servers).map((repo) => {
        const handler = serversHandler[repo.name];
        console.log(
          "🚀 ~ {Object.values ~ handler:",
          handler.handles,
          repo.repositoryIds,
        );

        return (
          <RepoContext.Provider value={handler} key={repo.name}>
            <Title order={2}>
              {repo.name}

              <Text size="sm">{repo.url}</Text>
            </Title>
            {/* {Object.keys(handler.handles).map((repoIdFromCache) => {
              return <ProjectList repo={repo} repositoryId={repoIdFromCache} />;
            })} */}

            {repo.repositoryIds[0] ? (
              <ProjectList repo={repo} repositoryId={repo.repositoryIds[0]} />
            ) : null}
            <Actions repo={repo} repositoryId={repo.repositoryIds[0]} />
            <Divider my="lg" />
          </RepoContext.Provider>
        );
      })}
    </div>
  );
};

import { useCallback } from "react";
import {
  serversHandler,
  useServersContext,
} from "../../serversContext/serversContext";
import { notifications } from "@mantine/notifications";
import { getDocHandlerFromRepo } from "../utils.repositories";
import { TProject } from "../../../types/schema";

export const useCopyOfflineProjectToServer = () => {
  const { servers } = useServersContext();

  return useCallback(
    (project: TProject, serverId: string) => {
      const serverRepo = Object.values(servers).find((s) => s.id === serverId);

      if (
        !serverRepo ||
        !serversHandler[serverId] ||
        !serverRepo.repositoryIds[0]
      ) {
        notifications.show({
          withBorder: true,
          title: "Error!",
          message: "An error occurred while copying project",
          color: "red",
        });
        return;
      }

      const docHandle = getDocHandlerFromRepo(
        serverRepo,
        serversHandler[serverId],
        serverRepo.repositoryIds[0],
      );

      docHandle?.change((doc) => {
        doc.projects.push(project);

        notifications.show({
          withBorder: true,
          title: "Success!",
          message: "Project copied to remote server",
        });
      });
    },
    [servers],
  );
};

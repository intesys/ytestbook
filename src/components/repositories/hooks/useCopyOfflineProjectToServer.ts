import { useCallback } from "react";
import { notifications } from "@mantine/notifications";
import {
  serversHandler,
  useServersContext,
} from "@/components/serversContext/serversContext";
import { TProject } from "@/types/schema";
import { getDocHandlerFromRepo } from "../utils.repositories";

export const useCopyOfflineProjectToServer = () => {
  const { servers } = useServersContext();

  return useCallback(
    async (project: TProject, serverId: string) => {
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

      const docHandle = await getDocHandlerFromRepo(
        serverRepo,
        serversHandler[serverId],
        serverRepo.repositoryIds[0]
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
    [servers]
  );
};

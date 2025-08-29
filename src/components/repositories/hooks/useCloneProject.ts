import { notifications } from "@mantine/notifications";
import { useCallback } from "react";
import { detachObjectFromAutomergeProps } from "../../../lib/repositories/detachObjectFromAutomergeProps";
import { StatusEnum, TProject } from "../../../types/schema";
import { CloneProjectModalFormValues } from "../../modals/cloneProjectModal/CloneProjectModal";
import {
  serversHandler,
  useServersContext,
} from "../../serversContext/serversContext";
import { getDocHandlerFromRepo } from "../utils.repositories";

export const useCloneProject = () => {
  const { servers } = useServersContext();

  return useCallback(
    async (project: TProject, options: CloneProjectModalFormValues) => {
      const serverRepo = Object.values(servers).find(
        (s) => s.id === options.serverId,
      );

      if (
        !serverRepo ||
        !serversHandler[options.serverId] ||
        !serverRepo.repositoryIds[0]
      ) {
        notifications.show({
          withBorder: true,
          title: "Error!",
          message: "An error occurred while cloning the project",
          color: "red",
        });
        return;
      }

      const docHandle = await getDocHandlerFromRepo(
        serverRepo,
        serversHandler[options.serverId],
        serverRepo.repositoryIds[0],
      );

      const projectID = crypto.randomUUID();
      const updateTime = new Date().getTime();

      const newProject: TProject = {
        title: options.newName,
        id: projectID,
        createdAt: updateTime,
        collaborators: project.collaborators?.map((collaborator) =>
          detachObjectFromAutomergeProps(collaborator),
        ),
        collaboratorToTest: project.collaboratorToTest?.map((ctt) => [...ctt]),
        tagToTest: project.tagToTest?.map((tagToTest) => [...tagToTest]),
        testCases: project.testCases.map((testCase) => ({
          id: testCase.id,
          createdAt: updateTime,

          comments: options.doNotImportNotes
            ? []
            : testCase.comments.map((comment) => ({
                caseId: testCase.id,
                id: testCase.id,
                createdAt: updateTime,
                collaboratorId: comment.collaboratorId,
                content: comment.content,
                resolved: comment.resolved,
                testStatusWhenCreated: comment.testStatusWhenCreated,
              })),
          status: options.resetStatuses ? StatusEnum.TODO : testCase.status,
          tests: testCase.tests.map((test) => ({
            id: test.id,
            status: options.resetStatuses ? StatusEnum.TODO : test.status,
            steps: test.steps.map((step) => ({
              status: options.resetStatuses ? StatusEnum.TODO : step.status,
              id: step.id,
              createdAt: updateTime,
              description: step.description ?? "",
              testId: test.id,
              title: step.title,
              lastUpdate: updateTime,
            })),
            caseId: testCase.id,
            createdAt: updateTime,
            title: test.title,
            description: test.description ?? "",
            lastUpdate: updateTime,
          })),
          completion: testCase.completion,
          title: testCase.title,
          projectId: projectID,
          description: testCase.description ?? "",
          jiraLink: testCase.jiraLink ?? "",
          lastUpdate: updateTime,
        })),
        allTags: [...(project.allTags ?? [])],
        statusChanges: project.statusChanges.map((statusChange) =>
          detachObjectFromAutomergeProps(statusChange),
        ),
        description: project.description,
        customer: project.customer,
        lastUpdate: updateTime,
      };

      docHandle?.change((doc) => {
        doc.projects.push(newProject);

        notifications.show({
          withBorder: true,
          title: "Success!",
          message: "Project clone to the selected server",
        });
      });
    },
    [servers],
  );
};

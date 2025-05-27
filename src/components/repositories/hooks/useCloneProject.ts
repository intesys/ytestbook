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
    (project: TProject, options: CloneProjectModalFormValues) => {
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

      const docHandle = getDocHandlerFromRepo(
        serverRepo,
        serversHandler[options.serverId],
        serverRepo.repositoryIds[0],
      );

      const projectID = crypto.randomUUID();

      // TODO: optimize this code performance
      const newProject: TProject = {
        title: options.newName,
        id: projectID,
        createdAt: new Date().getTime(),
        collaborators: project.collaborators?.map((collaborator) =>
          detachObjectFromAutomergeProps(collaborator),
        ),
        collaboratorToTest: project.collaboratorToTest?.map((ctt) => [...ctt]),
        tagToTest: project.tagToTest?.map((tagToTest) => [...tagToTest]),
        testCases: project.testCases.map((testCase) => {
          return {
            id: testCase.id,
            createdAt: new Date().getTime(),

            comments: options.doNotImportNotes
              ? []
              : testCase.comments.map((comment) => ({
                  caseId: testCase.id,
                  id: testCase.id,
                  createdAt: new Date().getTime(),
                  collaboratorId: comment.collaboratorId,
                  content: comment.content,
                  resolved: comment.resolved,
                  testStatusWhenCreated: comment.testStatusWhenCreated,
                })),
            status: options.resetStatuses ? StatusEnum.TODO : testCase.status,
            tests: testCase.tests.map((test) => {
              return {
                id: test.id,
                status: options.resetStatuses ? StatusEnum.TODO : test.status,
                steps: test.steps.map((step) => {
                  return {
                    status: options.resetStatuses
                      ? StatusEnum.TODO
                      : step.status,
                    id: step.id,
                    createdAt: new Date().getTime(),
                    description: step.description ?? "",
                    testId: test.id,
                    title: step.title,
                    lastUpdate: new Date().getTime(),
                  };
                }),
                caseId: testCase.id,
                createdAt: new Date().getTime(),
                title: test.title,
                description: test.description ?? "",
                lastUpdate: new Date().getTime(),
              };
            }),
            completion: testCase.completion,
            title: testCase.title,
            projectId: projectID,
            description: testCase.description ?? "",
            jiraLink: testCase.jiraLink ?? "",
            lastUpdate: new Date().getTime(),
          };
        }),
        allTags: project.allTags?.map((tag) => tag),
        statusChanges: project.statusChanges.map((statusChange) =>
          detachObjectFromAutomergeProps(statusChange),
        ),
        description: project.description,
        customer: project.customer,
        lastUpdate: new Date().getTime(),
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

import { useRepo } from "@automerge/automerge-repo-react-hooks";
import { Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { z } from "zod";
import FileTypeJson from "../../assets/icons/bi_filetype-json.svg";
import { TJsonExport } from "../../types/json-export";
import { Repository } from "../serversContext/types";
import { ActionButton } from "../shared/ActionButton/ActionButton";
import classes from "./repositories.module.css";
import { getDocHandlerFromRepo } from "./utils.repositories";
import { routesHelper } from "../../lib/helpers/routesHelper";
import { useNavigate } from "react-router";
import slugify from "slugify";

type ImportJSONProps = {
  repo: Repository;
  repositoryId?: string;
};

export const ImportJSON = ({ repo, repositoryId }: ImportJSONProps) => {
  const repoHandler = useRepo();
  const navigate = useNavigate();

  const tryImportJSON: (
    fileReaderResult?: FileReader["result"],
  ) => string | false = (fileReaderResult) => {
    try {
      if (!fileReaderResult || typeof fileReaderResult !== "string") {
        throw Error();
      }

      const docHandle = getDocHandlerFromRepo(repo, repoHandler, repositoryId);
      const parsedData: TJsonExport = JSON.parse(fileReaderResult);

      // Checking parsedData validity
      const schema = z.object({
        networkServerUrl: z.string(),
        repository: z.object({
          id: z.string(),
          description: z.string(),
          title: z.string(),
        }),
        project: z.object({
          id: z.string(),
          testCases: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              description: z.string().optional(),
              projectId: z.string(),
              status: z.string(),
              tests: z.array(
                z.object({
                  id: z.string(),
                  title: z.string(),
                  description: z.string().optional(),
                  caseId: z.string(),
                  status: z.string(),
                  steps: z.array(
                    z.object({
                      id: z.string(),
                      title: z.string(),
                      description: z.string().optional(),
                      testId: z.string(),
                      status: z.string(),
                    }),
                  ),
                }),
              ),
              comments: z.array(
                z.object({
                  id: z.string(),
                  resolved: z.boolean(),
                  username: z.string(),
                  content: z.string(),
                }),
              ),
            }),
          ),
        }),
      });

      const isValid = schema.safeParse(parsedData);
      console.error(isValid);
      if (!isValid.success) {
        throw new Error();
      }

      const projectNewId = crypto.randomUUID();
      parsedData.project.id = projectNewId;

      docHandle?.change((d) => {
        d.projects.push(parsedData.project);
      });

      return projectNewId;
    } catch (error) {
      notifications.show({
        message: "yTestbook JSON is not valid",
        color: "red",
      });
      return false;
    }
  };

  return (
    <Dropzone
      onDrop={async (files) => {
        if (!files[0]) {
          return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
          const projectId = tryImportJSON(event.target?.result);

          if (projectId) {
            navigate(routesHelper.projectDetail(slugify(repo.name), projectId));
          }
        };

        reader.readAsText(files[0]);
      }}
      multiple={false}
      className={classes.jsonImporter}
    >
      {/* <Action
            title="Upload project"
            label="Drag and drop the testbook file here"
            icon={FileTypeJson}
            action={() => ""}
          /> */}

      <ActionButton
        // onClick={createTestbookAction}
        justify="left"
        icon={FileTypeJson}
      >
        <Text span fw={700}>
          Import
        </Text>{" "}
        <Text span fw={400}>
          Testbook
        </Text>
      </ActionButton>
    </Dropzone>
  );
};

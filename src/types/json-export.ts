import { TProject } from "./schema";

export type TJsonExport = {
  networkServerUrl: string;
  repository: {
    id: string;
    title: string;
    description: string;
  };
  project: TProject;
};

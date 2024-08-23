import { Repo } from "@automerge/automerge-repo";

export enum REPOSITORY_TYPE {
  offline = "offline",
  remote = "remote",
}

export type Repository = {
  type: REPOSITORY_TYPE;
  name: string;
  handler: Repo;
};

export type Server = {
  id: string;
  repositories: Repository[];
};

export type StorageServersConfig = {
  servers?: {
    name: string;
    url: string;
    repositoryIds: string[];
  }[];
};

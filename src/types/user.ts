import { TYPE } from "./entityTypes";

export type User = {
  type: TYPE.USER;
  name: string;
  image?: string;
  role?: string;
  created?: string;
  modified?: string;
};

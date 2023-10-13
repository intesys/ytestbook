import { TYPE } from "./entityTypes";

export type Comment {
  type: TYPE.COMMENT,
  relatedEntity: string, // can be any TYPE in ./entityTypes
  relatedId: string, // foreignKey
  text: string,
  authorId?: string, // related to User
  solved: boolean,
  created?: string,
  modified?: string
} & PouchDB.Core.IdMeta;
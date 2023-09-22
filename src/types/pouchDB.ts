export type PouchDBDocument<T> = T & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

/**
 * Name and location of a registered testbook
 * plus any other useful string info
 */
export type DBRegistryDoc = {
  /**
   * Real database name
  */
  _id: string;
  /**
   * Database label
   */
  name: string;
  /**
   * URL or local URI
   */
  location: string;
} & Record<string, string>;
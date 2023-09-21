export type PouchDBDocument<T> = T & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

/**
 * Name and location of a registered testbook
 * plus any other useful string info
 */
export type DBRegistryKey = {
  /**
   * Database label
   */
  name: string;
  /**
   * Real database name
   */
  slug: string;
  /**
   * URL or local URI
   */
  location: string;
} & Record<string, string>;
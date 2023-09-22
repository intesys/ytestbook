import { server } from '../../config.json';

/**
 * PouchDB base path
 * Where main database is located
 * Testbook databases will be saved in a subfolder
 */
export const dbLocation = `${server.protocol}://${server.host}:${server.port}/${server.db}/`;

export const DB_INDEX_NAME = 'index_db__';

/**
 * Registry key of the main database, its an array of objects representing installed testbooks
 * in this format:
 * { name: string, location: string } 
 */
export const DB_REGISTRY_ID = 'registry'; // TODO remove

/**
 * Special key where database infos are stored
 */
export const DB_INFO_ID = "db_info";
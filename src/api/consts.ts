import { server } from '../../config.json';

/**
 * PouchDB base path
 * Where main database is located
 * Testbook databases will be saved in a subfolder
 */
export const dbLocation = `${server.protocol}://${server.host}:${server.port}/${server.db}/`;

export const TESTBOOK_INDEX = 'testbook_index_db';

/**
 * Registry key of the main database, its an array of objects representing installed testbooks
 * in this format:
 * { name: string, location: string } 
 */
export const DB_REGISTRY_ID = 'registry';

/**
 * Special key where database infos are stored
 */
export const DB_INFO_ID = "db_info";
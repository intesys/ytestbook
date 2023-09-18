import { server } from '../../../config.json';
import { initializeIndexes } from "./initialize";

// const dbURL = `${server.protocol}://${server.host}:${server.port}/${server.basePath}/`;
const dbURL = `:${server.port}/${server.db}/`; // same domain, cors ok

export const DB = new PouchDB(dbURL);

initializeIndexes(DB);

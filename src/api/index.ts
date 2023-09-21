import { TESTBOOK_INDEX, dbLocation } from "./consts";


export const MAINDB = new PouchDB(`${dbLocation}${TESTBOOK_INDEX}/`);
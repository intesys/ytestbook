export const initializeIndexes = async (DB: PouchDB.Database) => {
  await DB.createIndex({ index: { fields: ["type"] } });
  await DB.createIndex({ index: { fields: ["tags"] } });
  await DB.createIndex({ index: { fields: ["status"] } });
}
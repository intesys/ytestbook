import { RxDatabase } from "rxdb";

import testBookSchema from "./schema/testbook.json";

export const collectionsInit = async (db: RxDatabase) => {
  // create collections
  console.log("DatabaseService: create Testbook collections");

  await db.addCollections({
    testbooks: {
      schema: testBookSchema,
    },
  });
};

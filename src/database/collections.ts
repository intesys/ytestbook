import { RxDatabase } from "rxdb";

import testBookSchema from "./schema/testbook.json";
import useCaseSchema from "./schema/usecase.json";
import testSchema from "./schema/test.json";
import stepSchema from "./schema/step.json";
import sessionSchema from "./schema/session.json";
import memberSchema from "./schema/member.json";
import statusSchema from "./schema/status.json";
import tagSchema from "./schema/tag.json";

export const collectionsInit = async (db: RxDatabase) => {
  // create collections
  console.log("DatabaseService: create collections");

  await db.addCollections({
    testbook: {
      schema: testBookSchema,
    },
    usecase: {
      schema: useCaseSchema,
    },
    test: {
      schema: testSchema,
    },
    step: {
      schema: stepSchema,
    },
    session: {
      schema: sessionSchema,
    },
    status: {
      schema: statusSchema,
    },
    member: {
      schema: memberSchema,
    },
    tag: {
      schema: tagSchema,
    },
  });
};

import { useEffect, useState } from "react";
import { DBRegistryDoc } from "../../../../types/pouchDB";
import { findAllTestbooks } from "../../../../api/models/testbook";

/**
 * Adds, updates or removes resource from list.
 * If resource.doc doesn't exists, it returns the original list
 */
const updateIndex = (resource: PouchDB.Core.ChangesResponseChange<DBRegistryDoc>) => (list: DBRegistryDoc[]): DBRegistryDoc[] => {
  if (!resource.doc) {
    return list;
  }

  if (resource.deleted) {
    const index = list.findIndex(el => el._id === resource.doc?._id);
    let updatedList = [...list];
    updatedList.splice(index, 1);
    return updatedList;
  }

  const existsAtIndex = list.findIndex(el => el._id === resource.doc?._id);
  if (existsAtIndex > -1) {
    list[existsAtIndex] = resource.doc as DBRegistryDoc;
    return list;
  }

  return [...list, resource.doc as DBRegistryDoc];
}

/**
 * Returns a react state value representing all available testbooks.
 * It's reactive
 */
export const useAllTestbooks = (): DBRegistryDoc[] => {
  const [testbooks, setTestbooks] = useState<DBRegistryDoc[]>([]);

  useEffect(() => {
    const watcher = findAllTestbooks()
      .on("change", (res) => {
        setTestbooks(updateIndex(res));
      })
      .on("error", console.error) // TODO: add notifications
      .on("complete", () => console.log("completed")); // TODO: remove
    return () => watcher.cancel();
  }, []);

  return testbooks;
}
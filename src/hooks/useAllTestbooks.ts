import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { findAllTestbooks } from "../api/models/testbook";
import { DBRegistryDoc } from "../types/pouchDB";

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
      .on("error", (err) =>
        notifications.show({
          id: "err_find_testbooks",
          title: "An error occurred loading database",
          message: err
        })
      );
    return () => watcher.cancel();
  }, []);

  return testbooks;
}
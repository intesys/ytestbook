import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { watchAllTestbooks } from "../api/models/testbook";
import { DBRegistryDoc } from "../types/pouchDB";
import { updateStateOnChange } from "../api/lib/updateStateOnChange";

/**
 * Returns a react state value representing all available testbooks.
 * It's reactive
 */
export const useAllTestbooks = (): DBRegistryDoc[] => {
  const [testbooks, setTestbooks] = useState<DBRegistryDoc[]>([]);

  useEffect(() => {
    const watcher = watchAllTestbooks()
      .on("change", (res) => {
        setTestbooks(updateStateOnChange<DBRegistryDoc>(res));
      })
      .on("error", (err) =>
        notifications.show({
          id: "err_find_testbooks",
          title: "An error occurred loading testbooks",
          message: err,
          color: "red"
        })
      );
    return () => watcher.cancel();
  }, []);

  return testbooks;
}
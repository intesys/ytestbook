import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { watchAllTestbooks } from "../api";
import { findAllTestbooks } from "../api/lib/testbook";
import { updateStateOnChange } from "../api/lib/updateStateOnChange";
import { DBRegistryDoc } from "../types/pouchDB";

/**
 * Returns a react state value representing all available testbooks.
 * It's reactive
 */
export const useAllTestbooks = (): DBRegistryDoc[] => {
  const [testbooks, setTestbooks] = useState<DBRegistryDoc[]>([]);
  const [canWatch, setCanWatch] = useState(false);

  useEffect(() => {
    findAllTestbooks()
      .then(res => setTestbooks(res.docs))
      .finally(() => setCanWatch(true))
  }, [])

  useEffect(() => {
    if (!canWatch) {
      return;
    }

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
  }, [canWatch]);

  return testbooks;
}
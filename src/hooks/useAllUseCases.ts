import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { watchAll } from "../api";
import { updateStateOnChange } from "../api/lib/updateStateOnChange";
import { TYPE } from "../types/entityTypes";
import { UseCase } from "../types/useCase";

export const useAllUseCases = (testbook: string) => {
  const [useCases, setUsecases] = useState<UseCase[]>([]);

  useEffect(() => {
    const watcher = watchAll<UseCase>(testbook, TYPE.USE_CASE)
      .on("change", (res) => {
        setUsecases(updateStateOnChange<UseCase>(res));
      })
      .on("error", (err) =>
        notifications.show({
          id: "err_find_usecases",
          title: "An error occurred loading use cases",
          message: err,
          color: "red"
        })
      );
    return () => watcher.cancel();
  }, []);

  return useCases;
}
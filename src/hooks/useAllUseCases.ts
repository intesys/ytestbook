import { useEffect, useState } from "react";
import { UseCase } from "../types/useCase";
import { updateStateOnChange } from "../api/lib/updateStateOnChange";
import { watchUseCases } from "../api/models/useCase";
import { notifications } from "@mantine/notifications";

export const useAllUseCases = (testbook: string) => {
  const [useCases, setUsecases] = useState<UseCase[]>([]);

  useEffect(() => {
    const watcher = watchUseCases(testbook)
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
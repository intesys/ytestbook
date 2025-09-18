import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { STORAGE_KEYS } from "@/lib/constants/localStorageKeys";

export const useProjectVisibility = () => {
  const [hiddenProjectIds, setHiddenProjectIds] = useLocalStorage<string[]>({
    key: STORAGE_KEYS.HIDDEN_PROJECTS_IDS,
    defaultValue: [],

    serialize: (value) => {
      return JSON.stringify(value);
    },
    deserialize: (value) => {
      if (!value) {
        return [];
      }
      return JSON.parse(value);
    },
  });

  const hideProject = useCallback(
    (id: string) => {
      if (!hiddenProjectIds.includes(id)) {
        const newList = [...hiddenProjectIds, id];
        setHiddenProjectIds(newList);
      }
    },
    [hiddenProjectIds, setHiddenProjectIds]
  );

  const showAllProjects = useCallback(() => {
    setHiddenProjectIds([]);
  }, [setHiddenProjectIds]);

  return useMemo(
    () => ({
      hiddenProjectIds,
      hideProject,
      showAllProjects,
    }),
    [hiddenProjectIds, hideProject, showAllProjects]
  );
};

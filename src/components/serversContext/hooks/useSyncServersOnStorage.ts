import { useEffect } from "react";
import { REPOSITORY_TYPE, ServersList, StorageServersConfig } from "../types";
import { STORAGE_KEYS } from "../../../lib/constants/localStorageKeys";

export const useSyncServersOnStorage = (
  servers: ServersList,
  isFirstRender: boolean,
) => {
  useEffect(() => {
    if (isFirstRender) {
      return;
    }
    const configToStore: StorageServersConfig = {
      servers: Object.values(servers)
        .filter((s) => s.type === REPOSITORY_TYPE.remote)
        .map((s) => ({
          id: s.id,
          name: s.name,
          repositoryIds: s.repositoryIds,
          url: s.url,
          opened: s.opened,
        })),
    };

    localStorage.setItem(
      STORAGE_KEYS.SERVERS_CONF,
      JSON.stringify(configToStore),
    );
  }, [isFirstRender, servers]);
};

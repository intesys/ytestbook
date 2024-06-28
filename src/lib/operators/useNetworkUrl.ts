import { useCallback, useMemo, useState } from "react";

export const NETWORK_URL_OFFLINE = "offline";
export const NETWORK_URL_STORAGE_KEY = "yttNetworkUrl";

export const useNetworkUrl = () => {
  const [networkUrl, setNetworkUrl] = useState<string | null>(
    localStorage.getItem(NETWORK_URL_STORAGE_KEY),
  );

  const isFirstAccess = useMemo(
    () => !networkUrl || networkUrl === "",
    [networkUrl],
  );

  const setNetworkUrlAndRefresh = useCallback(
    (newNetworkUrl: string) => {
      setNetworkUrl(newNetworkUrl);
      localStorage.setItem(NETWORK_URL_STORAGE_KEY, newNetworkUrl);

      if (!isFirstAccess) {
        window.location.reload();
      }

      window.location.href = "/";
    },
    [isFirstAccess, setNetworkUrl],
  );

  return useMemo(
    () => ({
      networkUrl,
      setNetworkUrl: setNetworkUrlAndRefresh,
      isFirstAccess,
      isOfflineMode: networkUrl === NETWORK_URL_OFFLINE,
    }),
    [isFirstAccess, networkUrl, setNetworkUrlAndRefresh],
  );
};

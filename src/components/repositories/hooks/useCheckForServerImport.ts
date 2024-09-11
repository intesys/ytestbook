import { modals } from "@mantine/modals";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { QUERY_PARAMS } from "../../../lib/constants/queryParams";
import { AddServerFormValues } from "../../modals/addServerModal/AddServerModal";
import { Modals } from "../../modals/modals";
import { useServersContext } from "../../serversContext/serversContext";

export const useCheckForServerImport = (
  addServerCallback: (values: AddServerFormValues) => void,
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addServer } = useServersContext();

  useEffect(() => {
    const serverImport = searchParams.get(QUERY_PARAMS.SERVER_IMPORT);

    if (serverImport) {
      const decodedServerInfos = JSON.parse(atob(serverImport));

      if (
        !decodedServerInfos["name"] ||
        !decodedServerInfos["url"] ||
        !decodedServerInfos["documentId"]
      ) {
        return;
      }

      setSearchParams({});

      modals.openContextModal({
        modal: Modals.AddServerModal,
        title: "Add server",
        centered: true,
        innerProps: {
          defaultValues: decodedServerInfos,
          handleSubmit: (values) => {
            addServerCallback(values);
          },
        },
      });
    }
  }, [addServer, addServerCallback, searchParams, setSearchParams]);
};

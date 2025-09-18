import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { modals } from "@mantine/modals";
import { AddServerFormValues } from "@/components/modals/addServerModal/AddServerModal";
import { Modals } from "@/components/modals/modals";
import { QUERY_PARAMS } from "@/lib/constants/queryParams";

export const useCheckForServerImport = (
  addServerCallback: (values: AddServerFormValues) => void
) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
  }, [addServerCallback, searchParams, setSearchParams]);
};

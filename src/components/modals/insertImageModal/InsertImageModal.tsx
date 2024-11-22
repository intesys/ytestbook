import { ContextModalProps } from "@mantine/modals";
import { useCallback } from "react";
import { AddImageUrlForm } from "./partials/AddImageUrlForm";
import { UploadImageForm } from "./partials/UploadImageForm";
import { Tabs } from "@mantine/core";
import { IconLink, IconUpload } from "@tabler/icons-react";

export type TInsertImageModalProps = {
  handleCancel?: () => void;
  handleSubmit?: (value: string) => void;
};

export const InsertImageModal = ({
  id,
  context,
  innerProps: { handleCancel, handleSubmit },
}: ContextModalProps<TInsertImageModalProps>) => {
  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const cancelHandler = useCallback(() => {
    if (handleCancel) {
      handleCancel();
    }
    close();
  }, [close, handleCancel]);

  const submitHandler = useCallback(
    (value: string) => {
      if (handleSubmit) {
        handleSubmit(value);
      }
      close();
    },
    [close, handleSubmit],
  );

  return (
    <Tabs defaultValue="upload">
      <Tabs.List mb={"md"}>
        <Tabs.Tab value="upload" leftSection={<IconUpload size={18} />}>
          Local
        </Tabs.Tab>
        <Tabs.Tab value="insertUrl" leftSection={<IconLink size={18} />}>
          From URL
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="upload">
        <UploadImageForm
          handleCancel={cancelHandler}
          handleSubmit={submitHandler}
        />
      </Tabs.Panel>

      <Tabs.Panel value="insertUrl">
        <AddImageUrlForm
          handleCancel={cancelHandler}
          handleSubmit={submitHandler}
        />
      </Tabs.Panel>
    </Tabs>
  );
};

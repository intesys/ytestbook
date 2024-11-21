import { Button, Center, Group, Image, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useMemo, useState } from "react";
import { IMAGE_INSERT_ALLOWED_MIME_TYPES } from "../../../../lib/constants/generic";
import { compressImage } from "../../../../lib/helpers/compressImage";
import { convertBase64 } from "../../../../lib/helpers/convertBase64";
import { TInsertImageModalProps } from "../InsertImageModal";

type UploadImageFormProps = TInsertImageModalProps;

export const UploadImageForm = ({
  handleCancel,
  handleSubmit,
}: UploadImageFormProps) => {
  const [uploadedFile, setUploadedFile] = useState<FileWithPath>();

  const imagePreview = useMemo(() => {
    if (uploadedFile) {
      const imageUrl = URL.createObjectURL(uploadedFile);
      return (
        <Center mb={"lg"}>
          <Image
            src={imageUrl}
            h={200}
            w="auto"
            maw={"100%"}
            fit="contain"
            onLoad={() => URL.revokeObjectURL(imageUrl)}
          />
        </Center>
      );
    }

    return null;
  }, [uploadedFile]);

  const handleFormSubmit = async () => {
    if (!handleSubmit || !uploadedFile) {
      return;
    }

    const compressedFile = await compressImage(uploadedFile);
    const base64 = (await convertBase64(compressedFile)) as string;
    handleSubmit(base64);
  };

  return (
    <Stack>
      <Dropzone
        onDrop={(files) => {
          setUploadedFile(files[0]);
        }}
        maxSize={2 * 1024 ** 2}
        accept={IMAGE_INSERT_ALLOWED_MIME_TYPES}
        multiple={false}
      >
        {imagePreview}
        <Dropzone.Accept>
          <Text size="xl" inline mb="sm">
            Drop image here
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            The uploaded image should not exceed 2Mb
          </Text>
        </Dropzone.Accept>
        <Dropzone.Idle>
          <Text size="xl" inline mb="sm">
            Drag image here or click to select
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            The uploaded image should not exceed 2Mb
          </Text>
        </Dropzone.Idle>
        <Dropzone.Reject>
          <Text size="xl" inline mb="sm">
            Dragged file is not valid
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            The uploaded image should not exceed 2Mb
          </Text>
        </Dropzone.Reject>
      </Dropzone>

      <Group justify="flex-end" gap="md">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} disabled={!uploadedFile}>
          Insert
        </Button>
      </Group>
    </Stack>
  );
};

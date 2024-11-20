import { Button, Center, Group, Image, Stack, Text } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useMemo, useState } from "react";
import { convertBase64 } from "../../../../lib/helpers/convertBase64";
import { TInsertImageModalProps } from "../InsertImageModal";
import Compressor from "compressorjs";

type UploadImageFormProps = Pick<
  TInsertImageModalProps,
  "handleSubmit" | "handleCancel"
>;

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

  const handleFormSubmit = () => {
    if (!handleSubmit || !uploadedFile) {
      return;
    }

    new Compressor(uploadedFile, {
      quality: 0.6,
      success: async (result) => {
        const base64 = (await convertBase64(result)) as string;
        handleSubmit(base64);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  return (
    <Stack>
      <Dropzone
        onDrop={(files) => {
          setUploadedFile(files[0]);
        }}
        maxSize={2 * 1024 ** 2}
        accept={{
          "image/*": [], // All images
        }}
        multiple={false}
      >
        {imagePreview}
        <Dropzone.Idle>
          <Text size="xl" inline mb="sm">
            Drag image here or click to select
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            The uploaded image should not exceed 2Mb
          </Text>
        </Dropzone.Idle>
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

import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TInsertImageModalProps } from "../InsertImageModal";

type UploadImageFormProps = TInsertImageModalProps;

type FormValues = {
  imageUrl: string;
};

export const AddImageUrlForm = ({
  handleSubmit,
  handleCancel,
}: UploadImageFormProps) => {
  const form = useForm<FormValues>({
    initialValues: {
      imageUrl: "",
    },
    validate: {
      imageUrl: (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue.length <= 10) {
          return "Should be a valid URL";
        }
        if (!trimmedValue.startsWith("https://")) {
          return "Should be a valid URL";
        }
        return undefined;
      },
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    if (!handleSubmit || !values.imageUrl) {
      return;
    }

    handleSubmit(values.imageUrl);
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack>
        <TextInput
          data-autofocus
          {...form.getInputProps("imageUrl")}
          label="Image URL"
          placeholder="Please enter an image URL"
        />

        <Group justify="flex-end" gap="md">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!form.isValid()}>
            Insert
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

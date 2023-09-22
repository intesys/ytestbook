import { Card, Stack, Button } from "@mantine/core";
import TextField from "../../ui/TextField/TextField";
import { useForm } from "@mantine/form";
import { testbook_initialValues, testbook_validate } from "./const";
import { createTestbook } from "../../../api/models/testbook";
import { useCardStyles } from "./styles";
import { notifications } from "@mantine/notifications";

export const CreateTestbook: React.FC = () => {
  const { classes } = useCardStyles();
  const form = useForm({
    initialValues: testbook_initialValues,
    validate: testbook_validate,
  });

  const submitForm = () => {
    if (!form.validate().hasErrors) {
      createTestbook(form.values.name, form.values.client)
        .then(() => form.reset())
        .then(() =>
          notifications.show({
            id: "testbook_save",
            message: "Testbook saved",
          }),
        )
        .catch((err) => {
          console.error("Error saving db", err);
          form.setFieldError(
            "name",
            "Can't create testbook with this name, please try with another one",
          );
        });
    }
  };

  return (
    <Card title="Create a new Testbook" className={classes.card} padding="xl">
      <Stack>
        <TextField
          required
          placeholder="Testbook name"
          variant="blue"
          {...form.getInputProps(`name`)}
        />
        <TextField
          required
          placeholder="Client"
          variant="blue"
          {...form.getInputProps(`client`)}
        />
      </Stack>
      <Button mt="xl" fullWidth onClick={submitForm}>
        Create
      </Button>
    </Card>
  );
};

import { Card, Stack, Button } from "@mantine/core";
import TextField from "../../ui/TextField/TextField";
import { useForm } from "@mantine/form";
import { testbook_initialValues, testbook_validate } from "./const";
import { createTestbook } from "../../../api/lib/testbook";
import { useCardStyles } from "./styles";
import { notifications } from "@mantine/notifications";

export const CreateTestbook: React.FC = () => {
  const { classes } = useCardStyles();
  const form = useForm({
    initialValues: testbook_initialValues,
    validate: testbook_validate,
  });

  const submitForm = () => {
    console.log("submitted form");
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
      <form onSubmit={form.onSubmit(submitForm)}>
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
        <Button type="submit" mt="xl" fullWidth>
          Create
        </Button>
      </form>
    </Card>
  );
};

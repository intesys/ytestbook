import { Button, Card, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import classes from "./createTestbookForm.module.scss";
import { testbookInitialValues, testbookValidate } from "../../../../const";
import { createTestbook } from "../../../../../../../api";

export const CreateTestBookForm: React.FC = () => {
  const form = useForm({
    initialValues: testbookInitialValues,
    validate: testbookValidate,
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
    <Card
      title="Create a new Testbook"
      className={classes.card}
      padding="xl"
      radius="lg"
    >
      <form onSubmit={form.onSubmit(submitForm)}>
        <Stack>
          <TextInput
            required
            placeholder="Testbook name"
            className={classes.input}
            {...form.getInputProps(`name`)}
          />
          <TextInput
            required
            placeholder="Client"
            className={classes.input}
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

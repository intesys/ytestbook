import { Button, Center, Container, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { createTestbook } from "../../../api/models/testbook";
import SvgIcon from "../../misc/SvgIcon/SvgIcon";
import Card from "../../ui/Card/Card";
import TextField from "../../ui/TextField/TextField";
import { testbook_initialValues, testbook_validate } from "./const";
import useStyles from "./styles";
import { TestbookList } from "./TestbookList";

export const Home: React.FC = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: testbook_initialValues,
    validate: testbook_validate,
  });

  const submitForm = () => {
    if (!form.validate().hasErrors) {
      createTestbook(form.values.name, form.values.client)
        .then(console.log)
        .then(() => form.reset())
        .catch((err) => {
          form.setFieldError(
            "name",
            "Can't create testbook with this name, please try with another one",
          );
        });
    }
  };

  return (
    <div className={classes.home_layout}>
      <div className={classes.home_first}>
        <Container size="xs" className={classes.home_container}>
          <Center className={classes.home_logo}>
            <SvgIcon iconName="logo" />
          </Center>
          <Card title="Create a new Testbook">
            <>
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
            </>
          </Card>
        </Container>
      </div>

      <div className={classes.home_second}>
        <TestbookList />
      </div>
    </div>
  );
};

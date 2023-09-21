import { Button, Center, Container, Stack, Table } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { findAllTestbooks, createTestbook } from "../../../api/models/testbook";
import { DBRegistryKey } from "../../../types/pouchDB";
import SvgIcon from "../../misc/SvgIcon/SvgIcon";
import Card from "../../ui/Card/Card";
import TextField from "../../ui/TextField/TextField";
import { testbook_initialValues, testbook_validate } from "./const";
import useStyles from "./styles";
import { useNavigate } from "react-router";

export const Home: React.FC = () => {
  const [testbooks, setTestbooks] = useState<DBRegistryKey[]>([]);
  const { classes } = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const watcher = findAllTestbooks()
      .on("change", (res) => {
        setTestbooks(res.doc?.data ?? []);
      })
      .on("error", console.error) // TODO: add notifications
      .on("complete", () => console.log("completed")); // TODO: remove
    return () => watcher.cancel();
  }, []);

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

  const onClickTable = (testbook: DBRegistryKey) => {
    navigate(`/testbook/${testbook.slug}`);
  };

  const rows = testbooks?.map((testbook) => (
    <tr key={testbook.location} onClick={() => onClickTable(testbook)}>
      <td>{testbook.name}</td>
      <td>{testbook.client || ""}</td>
      <td>{testbook.created || ""}</td>
    </tr>
  ));

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
        <Container size="md" className={classes.home_container}>
          <h3 className={classes.table_header}>Saved testbooks</h3>
          <Table
            className={classes.table_content}
            mt={16}
            highlightOnHover
            verticalSpacing={10}
          >
            <thead>
              <tr>
                <th>Testbook name</th>
                <th>Client</th>
                <th>Last edit</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};

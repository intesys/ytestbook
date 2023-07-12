import React, { useEffect } from "react";
import { Container, Center, Button, Stack, Table, Loader } from "@mantine/core";
import useStyles from "./styles";
import Logo from "../../../assets/logo.svg";
import TextField from "../../ui/TextField/TextField";
import Card from "../../ui/Card/Card";
import { useYTestbookContext } from "../../../context/useYTestbookContext";
import { LOADING_STATUS } from "../../../reducer/types";
import { useForm } from "@mantine/form";
import { testbook_initialValues, testbook_validate } from "./const";

const Home: React.FC = () => {
  const { classes } = useStyles();

  const {
    state: {
      testbooks: { data: testbooksData, status: testbooksStatus },
    },
    getTestbooks,
    postTestbook,
  } = useYTestbookContext();

  useEffect(() => {
    getTestbooks();
  }, []);

  const form = useForm({
    initialValues: testbook_initialValues,
    validate: testbook_validate,
  });

  const submitForm = () => {
    if (!form.validate().hasErrors) {
      postTestbook({
        name: form.values.name,
        client: form.values.client,
      });
    }
  };

  const rows = testbooksData?.map((element) => (
    <tr key={element.id}>
      <td>{element.name}</td>
      <td>{element.client}</td>
      <td>{element.lastEdit}</td>
    </tr>
  ));

  return (
    <div className={classes.home_layout}>
      <div className={classes.home_first}>
        <Container size="xs" className={classes.home_container}>
          <Center className={classes.home_logo}>
            <Logo />
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
          {testbooksStatus === LOADING_STATUS.ERROR && <h5>Qualcosa è andato storto</h5>}
          {testbooksStatus === LOADING_STATUS.LOADING && (
            <Center>
              <Loader />
            </Center>
          )}
          {testbooksStatus === LOADING_STATUS.SUCCESS && (
            <>
              <h3 className={classes.table_header}>Last testbook</h3>
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
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Home;

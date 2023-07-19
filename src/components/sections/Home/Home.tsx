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
import { ROUTES_NAME } from "../../../routes/routes";
import { Navigate, useLocation } from "react-router";
import { ITestbookModel } from "../../../api/models";
import SvgIcon from "../../misc/SvgIcon/SvgIcon";

const Home: React.FC = () => {
  const { classes } = useStyles();
  let location = useLocation();

  console.log("asd");

  const {
    state: {
      testbooks: { data: testbooksData, status: testbooksStatus },
      testbook: { data: testbookData, status: testbookStatus },
    },
    getTestbooks,
    postTestbook,
    setTestbook,
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

  const onClickTable = (elem: ITestbookModel) => {
    elem && elem._id && setTestbook(elem);
  };

  const rows = testbooksData?.map((element) => (
    <tr key={element._id} onClick={() => onClickTable(element)}>
      <td>{element.name}</td>
      <td>{element.client}</td>
      <td>{element.lastEdit}</td>
    </tr>
  ));

  if (testbookStatus === LOADING_STATUS.SUCCESS && testbookData?._id) {
    return <Navigate to={ROUTES_NAME.APP} state={{ from: location }} replace />;
  }

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
              <Button
                mt="xl"
                fullWidth
                loading={testbookStatus === LOADING_STATUS.LOADING}
                onClick={submitForm}
              >
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

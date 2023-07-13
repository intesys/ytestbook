import React from "react";
import { Paper, Group, Container, Center, Button, Checkbox, Anchor, Stack } from "@mantine/core";
import useStyles from "./styles";
import { useForm } from "@mantine/form";
import Logo from "../../../assets/logo.svg";
import TextField from "../../ui/TextField/TextField";
import PasswordField from "../../ui/PasswordField/PasswordField";
import { useYTestbookContext } from "../../../context/useYTestbookContext";
import { userLogin_initialValues, userLogin_validate } from "./const";
import { LOADING_STATUS } from "../../../reducer/types";
import Card from "../../ui/Card/Card";
import { Navigate, useLocation } from "react-router";
import { ROUTES_NAME } from "../../../routes/routes";

const UserLogin: React.FC = () => {
  const { classes } = useStyles();
  let location = useLocation();

  const {
    state: {
      auth: { status: authStatus, data: authData },
    },
    userLogin,
  } = useYTestbookContext();

  const form = useForm({
    initialValues: userLogin_initialValues,
    validate: userLogin_validate,
  });

  const submitForm = () => {
    if (!form.validate().hasErrors) {
      userLogin({
        username: form.values.username,
        password: form.values.password,
      });
    }
  };

  if (authStatus === LOADING_STATUS.SUCCESS && authData) {
    return <Navigate to={ROUTES_NAME.HOME} state={{ from: location }} replace />;
  }

  return (
    <div className={classes.login_layout}>
      <Container size="xs" className={classes.login_container}>
        <Center className={classes.login_logo}>
          <Logo />
        </Center>
        <Card title="Login">
          <>
            <Stack>
              <TextField
                required
                placeholder="Your username"
                variant="blue"
                {...form.getInputProps(`username`)}
              />
              <PasswordField
                required
                placeholder="Your password"
                variant="blue"
                {...form.getInputProps(`password`)}
              />
            </Stack>
            <Group position="apart" mt="lg">
              <Checkbox
                label="Remember me"
                className={classes.card_checkbok}
                {...form.getInputProps(`remember`)}
              />
              <Anchor component="button" size="sm" sx={{ color: "#fff" }}>
                Forgot password?
              </Anchor>
            </Group>
            <Button
              mt="xl"
              fullWidth
              onClick={submitForm}
              loading={authStatus === LOADING_STATUS.LOADING}
            >
              Sign in
            </Button>
          </>
        </Card>
      </Container>
    </div>
  );
};

export default UserLogin;

import React from "react";
import { Paper, Group, Container, Center, Button, Checkbox, Anchor, Stack } from "@mantine/core";
import useStyles from "./styles";
import { useForm } from "@mantine/form";
import Logo from "../../assets/logo.svg";
import TextField from "../../components/ui/TextField/TextField";
import PasswordField from "../../components/ui/PasswordField/PasswordField";
import { useYTestbookContext } from "../../context/useYTestbookContext";
import { userLogin_initialValues, userLogin_validate } from "./const";
import { LOADING_STATUS } from "../../reducer/types";

const Login: React.FC = () => {
  const { classes } = useStyles();

  const {
    state: {
      auth: { status: authStatus },
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

  return (
    <div className={classes.login_layout}>
      <Container size="xs" className={classes.login_container}>
        <Center className={classes.login_logo}>
          <Logo />
        </Center>
        <div className={classes.card}>
          <h3 className={classes.card_header}>Login</h3>
          <Paper className={classes.card_content} p={32} mt={32} radius="xl">
            <Stack>
              <TextField required placeholder="Your username" {...form.getInputProps(`username`)} />
              <PasswordField
                required
                placeholder="Your password"
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
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default Login;

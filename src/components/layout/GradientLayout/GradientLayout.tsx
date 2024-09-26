import { Container, Grid, Stack, Image } from "@mantine/core";
import classes from "./gradientLayout.module.css";
import { PropsWithChildren } from "react";
import Logo from "../../../assets/logo.svg";

export const GradientLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.container}>
      <Container fluid>
        <Grid overflow="hidden">
          <Grid.Col
            span={{
              xl: 10,
              base: 12,
            }}
            offset={{
              xl: 1,
              base: 0,
            }}
          >
            <Stack gap={40} my={45}>
              <Image src={Logo} alt="yTestbook" w={78} mb={5} />

              <>{children}</>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

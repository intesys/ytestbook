import { Button, Stack, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import { GradientLayout } from "../layout/GradientLayout/GradientLayout";

export const NotFound = () => {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate("/");
  };

  return (
    <GradientLayout>
      <Stack justify="center" align="center">
        <Title order={3} c="white">
          Entity not found
        </Title>
        <Button onClick={goToHomepage}>Go to Homepage</Button>
      </Stack>
    </GradientLayout>
  );
};

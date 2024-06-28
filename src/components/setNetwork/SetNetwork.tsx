import {
  Button,
  Flex,
  Grid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  NETWORK_URL_OFFLINE,
  useNetworkUrl,
} from "../../lib/operators/useNetworkUrl";
import { Action } from "../action/Action";

import iconPaused from "../../assets/icons/status_paused.svg";

type FormValues = {
  networkUrl: string;
};

export function SetNetwork() {
  const { networkUrl, setNetworkUrl, isFirstAccess } = useNetworkUrl();

  const form = useForm({
    initialValues: {
      networkUrl: networkUrl ?? "",
    },
    validate: {
      networkUrl: isNotEmpty("Field required"),
    },
  });

  const handleSubmit = (values: FormValues) => {
    setNetworkUrl(values.networkUrl);
  };

  return (
    <Flex
      align="center"
      justify="center"
      direction={"column"}
      gap={16}
      h="100dvh"
      w={"100%"}
    >
      {isFirstAccess ? <Title order={2}>Welcome to yTestbook!</Title> : null}
      <Title order={3}>yTestbook Configuration</Title>
      <Text>
        You can set yTestbook to work offline or synced to a yTestbook server
      </Text>

      <Grid w="100%" p="md" gutter="lg">
        <Grid.Col span={2} visibleFrom="md" />
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Action
            action={() => setNetworkUrl(NETWORK_URL_OFFLINE)}
            label="Work Offline"
            icon={iconPaused}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <Text>Set a yTestbook server URL to be in sync with:</Text>

              <TextInput
                withAsterisk
                label="URL"
                {...form.getInputProps("networkUrl")}
              />
              <Button type="submit">Set Network URL</Button>
            </Stack>
          </form>
        </Grid.Col>
      </Grid>
    </Flex>
  );
}

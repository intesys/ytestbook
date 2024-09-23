import {
  Button,
  Group,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useMemo } from "react";
import { copyTextToClipboard } from "../../../lib/helpers/copyToClipboard.ts";
import { YtServer } from "../../serversContext/types.ts";
import { QUERY_PARAMS } from "../../../lib/constants/queryParams.ts";

type TShareServerModalModalInnerProps = {
  repo: YtServer;
  repositoryId: string;
};

export function ShareServerModal({
  innerProps: { repo, repositoryId },
}: ContextModalProps<TShareServerModalModalInnerProps>) {
  const theme = useMantineTheme();
  const shareLink = useMemo(() => {
    const serializedServerInfos = btoa(
      JSON.stringify({
        name: repo.name,
        url: repo.url,
        documentId: repositoryId,
      }),
    );

    return `${window.location.host}/?${QUERY_PARAMS.SERVER_IMPORT}=${serializedServerInfos}`;
  }, [repo.name, repo.url, repositoryId]);

  const copyShareLink = () => {
    copyTextToClipboard(shareLink);

    notifications.show({
      message: "Share link copied to clipboard",
    });
  };

  return (
    <Stack gap="md">
      <Group gap={"sm"}>
        <TextInput
          defaultValue={shareLink}
          data-share-link
          flex={1}
          onClick={copyShareLink}
          styles={{
            input: {
              opacity: 0.6,
              background: theme.colors.gray[1],
              color: theme.colors.gray[6],
            },
          }}
        />
        <Button onClick={copyShareLink}>Copy</Button>
      </Group>
    </Stack>
  );
}

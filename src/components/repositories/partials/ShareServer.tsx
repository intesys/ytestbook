import { IconShare } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { Modals } from "@/components/modals/modals";
import { YtServer } from "@/components/serversContext/types";
import { AnchorWithIcon } from "@/components/shared/AnchorWithIcon";

type ShareServerProps = {
  repo: YtServer;
  repositoryId: string;
};

export const ShareServer = ({ repo, repositoryId }: ShareServerProps) => {
  const onClick = () => {
    modals.openContextModal({
      modal: Modals.ShareServerModal,
      title: "Share server",
      centered: true,
      innerProps: {
        repo,
        repositoryId,
      },
    });
  };

  return (
    <AnchorWithIcon onClick={onClick} icon={<IconShare />} label="Share" />
  );
};

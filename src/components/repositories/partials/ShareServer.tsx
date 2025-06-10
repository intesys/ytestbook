import { modals } from "@mantine/modals";
import { IconShare } from "@tabler/icons-react";
import { Modals } from "../../modals/modals";
import { YtServer } from "../../serversContext/types";
import { AnchorWithIcon } from "../../shared/AnchorWithIcon";

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

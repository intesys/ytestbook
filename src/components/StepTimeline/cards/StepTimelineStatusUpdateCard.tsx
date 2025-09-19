import { useParams } from "react-router-dom";
import { Card, CardProps, Group, Stack, Text } from "@mantine/core";
import { CollaboratorAnchor } from "@/components/CollaboratorAnchor/CollaboratorAnchor.tsx";
import { InlineFlex } from "@/components/InlineFlex/InlineFlex.tsx";
import { RelativeDate } from "@/components/shared/relativeDate/RelativeDate.tsx";
import { StatusIcon } from "@/components/statusIcon/StatusIcon.tsx";
import { getStatusLabel } from "@/lib/helpers/getStatusLabel.ts";
import { useProject } from "@/lib/operators/useProject.ts";
import { StepTimelineStatusUpdate } from "../stepTimeline.types.ts";

interface StepTimelineStatusUpdateProps extends CardProps {
  item: StepTimelineStatusUpdate;
}

export const StepTimelineStatusUpdateCard = ({
  item,
  ...cardProps
}: StepTimelineStatusUpdateProps) => {
  const params = useParams();
  const project = useProject(params.projectId);

  const collaborator = item?.statusUpdate.collaboratorId
    ? project.getCollaborator(item?.statusUpdate?.collaboratorId)
    : undefined;

  const updateDate = (
    <Text span inline c="dimmed" size="sm">
      <RelativeDate timeStamp={item.statusUpdate?.createdAt} />
    </Text>
  );

  return (
    <Card radius="md" {...cardProps}>
      <Stack>
        <Group gap="md" align="center" justify="space-between">
          <Text span inline c="gray.7">
            <InlineFlex wrap="wrap">
              <CollaboratorAnchor collaborator={collaborator} withHoverCard />{" "}
              updated the status from{" "}
              <InlineFlex>
                <StatusIcon
                  status={item?.statusUpdate?.previousStatus}
                  showTooltip={false}
                />
                <Text inline span>
                  {getStatusLabel(item?.statusUpdate?.previousStatus)}
                </Text>
              </InlineFlex>{" "}
              to{" "}
              <InlineFlex>
                <StatusIcon
                  status={item?.statusUpdate?.targetStatus}
                  showTooltip={false}
                />
                <Text inline span>
                  {getStatusLabel(item?.statusUpdate?.targetStatus)}
                </Text>
              </InlineFlex>
            </InlineFlex>
          </Text>
          {updateDate}
        </Group>
        {item?.statusUpdate?.notes !== undefined &&
        item.statusUpdate.notes !== "" ? (
          <Text span inline>
            {item.statusUpdate.notes}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
};

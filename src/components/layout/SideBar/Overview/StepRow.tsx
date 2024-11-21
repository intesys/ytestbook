import { Flex, Table, Text } from "@mantine/core";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { routesHelper } from "../../../../lib/helpers/routesHelper";
import { useServerName } from "../../../../lib/helpers/useServerName";
import { TUseProject } from "../../../../lib/operators/types";
import { useTest } from "../../../../lib/operators/useTest";
import { TStep } from "../../../../types/schema";
import { RelativeDate } from "../../../shared/relativeDate/RelativeDate";
import { StatusButton } from "../../../statusButton/StatusButton";
import classes from "./overview.module.css";

type StepRowProps = {
  readonly project: TUseProject;
  readonly caseId: string;
  readonly step: TStep;
  openSidebar: () => void;
};

export const StepRow = ({
  openSidebar,
  project,
  caseId,
  step,
}: StepRowProps) => {
  const navigate = useNavigate();
  const serverName = useServerName();
  const test = useTest(project.data?.id, caseId, step.testId);

  const blockEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (!project.data?.id) {
    return null;
  }

  return (
    <Table.Tr
      className={clsx(classes.row, classes.stepRow)}
      onClick={() => {
        navigate(
          routesHelper.stepDetail(
            serverName,
            project.data.id,
            caseId,
            step.testId,
            step.id,
          ),
        );
        openSidebar();
      }}
    >
      <Table.Td />
      <Table.Td colSpan={3}>
        <Flex gap={10} align={"center"} mih={54}>
          <div onClick={blockEvents}>
            <StatusButton
              step={step}
              updateStepStatus={test.updateStepStatus}
            />
          </div>

          <Text size="sm">{step.title}</Text>
        </Flex>
      </Table.Td>

      <Table.Td visibleFrom="md">
        {step.lastUpdate ? <RelativeDate timeStamp={step.lastUpdate} /> : ""}
      </Table.Td>

      <Table.Td visibleFrom="md" />
    </Table.Tr>
  );
};

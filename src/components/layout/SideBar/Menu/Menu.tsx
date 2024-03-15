import { Anchor, Flex, List, Text } from "@mantine/core";
import classnames from "classnames";
import { Link, useParams } from "react-router-dom";
import { useProject } from "../../../../lib/operators/useProject";
import { StatusIcon } from "../../../statusIcon/StatusIcon";
import { Trail } from "../../../trail/Trail";
import classes from "./styles.module.scss";
import { TestCasesList } from "../../../testCasesList";

export const Menu: React.FC<{ activeCaseId: string; activeTestId: string }> = ({
  activeCaseId,
  activeTestId,
}) => {
  const params = useParams();
  const project = useProject(params.projectId);

  return (
    <List
      className={classnames(classes.navList)}
      miw={300}
      listStyleType="none"
    >
      <TestCasesList
        data={project.data?.testCases ?? []}
        activeCaseId={activeCaseId}
        activeTestId={activeTestId}
      />
    </List>
  );
};

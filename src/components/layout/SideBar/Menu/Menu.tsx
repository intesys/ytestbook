import { List } from "@mantine/core";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import { useProject } from "../../../../lib/operators/useProject";
import { TestCasesList } from "../../../testCasesList";
import classes from "./styles.module.scss";

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

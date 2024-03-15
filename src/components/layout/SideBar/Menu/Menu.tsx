import { List } from "@mantine/core";
import { useParams } from "react-router-dom";
import classes from "./styles.module.scss";
import { TestCasesList } from "../../../testCasesList";
import { useProject } from "../../../../lib/operators/useProject";

export const Menu: React.FC = () => {
  const { testbook, projectId, caseId, test, step } = useParams();
  const project = useProject(projectId);
  //const useCases = useAllUseCases(testbook ?? "");

  return (
    <List className={classes.ul}>
      {project.data && <TestCasesList data={project.data.testCases ?? []} />}
    </List>
  );
};

/**
 {useCases.map((useCase) => (
        <List.Item
          key={useCase._id}
          icon={<StatusIcon status={useCase.status} />}
        >
          {useCase.title}
        </List.Item>
      ))}
 */

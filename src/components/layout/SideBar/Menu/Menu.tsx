import { List } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useProject } from "../../../../lib/operators/useProject";
import { TestCasesList } from "../../../testCasesList";

export const Menu: React.FC<{ activeCaseId: string; activeTestId: string }> = ({
  activeCaseId,
  activeTestId,
}) => {
  const params = useParams();
  const project = useProject(params.projectId);

  return (
    <List miw={300} listStyleType="none">
      <TestCasesList
        data={project.data?.testCases ?? []}
        activeCaseId={activeCaseId}
        activeTestId={activeTestId}
      />
    </List>
  );
};

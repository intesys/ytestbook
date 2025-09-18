import { useParams } from "react-router-dom";
import { List } from "@mantine/core";
import { TestCasesList } from "@/components/testCasesList";
import { useProject } from "@/lib/operators/useProject";

interface MenuProps {
  activeCaseId: string;
  activeTestId: string;
}

export const Menu = ({ activeCaseId, activeTestId }: MenuProps) => {
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

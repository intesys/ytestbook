import { useParams } from "react-router-dom";
import { useAllUseCases } from "../../../../hooks/useAllUseCases";
import { Group, List } from "@mantine/core";
import { StatusIcon } from "../../../misc/StatusIcon";
import { useListStyles } from "./styles";

export const Menu: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();
  const useCases = useAllUseCases(testbook ?? "");
  const { classes } = useListStyles();

  return (
    <List className={classes.ul}>
      {useCases.map((useCase) => (
        <List.Item icon={<StatusIcon status={useCase.status} />}>
          {useCase.title}
        </List.Item>
      ))}
    </List>
  );
};

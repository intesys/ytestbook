import { List } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useAllUseCases } from "../../../../hooks/useAllUseCases";
import { StatusIcon } from "../../../shared/StatusIcon";
import classes from "./styles.module.scss";

export const Menu: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();
  const useCases = useAllUseCases(testbook ?? "");

  return (
    <List className={classes.ul}>
      {useCases.map((useCase) => (
        <List.Item
          key={useCase._id}
          icon={<StatusIcon status={useCase.status} />}
        >
          {useCase.title}
        </List.Item>
      ))}
    </List>
  );
};

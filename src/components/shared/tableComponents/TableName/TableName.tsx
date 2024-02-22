import { Flex } from "@mantine/core";
import classes from "./tableName.module.scss";

interface IProps {
  id: string;
  title?: string;
}

export const TableName = ({ id, title }: IProps) => {
  return (
    <Flex align="center" gap={5} className={classes.container}>
      <span className={`${classes.container}  ${classes.noWrap}`}>[{id}]</span>
      {title && (
        <Flex className={classes.noWrap}>
          - [
          <span className={`${classes.titleText} ${classes.noWrap}`}>
            {title}
          </span>
          ]
        </Flex>
      )}
    </Flex>
  );
};

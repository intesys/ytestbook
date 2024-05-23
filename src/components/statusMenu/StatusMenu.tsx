import { Menu, Text } from "@mantine/core";
import { StatusEnum } from "../../schema";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { TUseTest } from "../../lib/operators/types";

type TProps = {
  id: string;
  target: React.ReactNode;
  updateStepStatus: TUseTest["updateStepStatus"];
};

export function StatusMenu({ id, target, updateStepStatus }: TProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>{target}</Menu.Target>
      <Menu.Dropdown>
        {Object.keys(StatusEnum).map((status) => (
          <Menu.Item
            key={status}
            leftSection={
              <StatusIcon status={StatusEnum[status as StatusEnum]} />
            }
            onClick={(e) => {
              e.stopPropagation();
              updateStepStatus(id, StatusEnum[status as StatusEnum]);
            }}
          >
            <Text>{status}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

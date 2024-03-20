import { Menu, Text } from "@mantine/core";
import { StatusEnum } from "../../schema";
import { StatusIcon } from "../statusIcon/StatusIcon";

type TProps = {
  id: string;
  target: React.ReactNode;
  updateStatus: (id: string, status: StatusEnum) => void;
};

export function StatusMenu({ id, target, updateStatus }: TProps) {
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
              updateStatus(id, StatusEnum[status as StatusEnum]);
            }}
          >
            <Text>{status}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

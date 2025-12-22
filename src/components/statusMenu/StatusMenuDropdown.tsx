import React, { MouseEvent } from "react";
import { Box, Button, Image, Menu, Text } from "@mantine/core";
import ArrowDropdown from "@/assets/icons/arrow_drop_down.svg";
import { StatusIcon } from "@/components/statusIcon/StatusIcon";
import { getStatusColor } from "@/lib/helpers/getStatusColor";
import { getStatusLabel } from "@/lib/helpers/getStatusLabel";
import { StatusEnum } from "@/types/schema";

type StatusMenuDropdownProps = {
  onSelect: (status: StatusEnum) => void;
  currentStatus?: StatusEnum;
  target?: React.ReactNode;
};

export const StatusMenuDropdown = ({
  onSelect,
  target,
  currentStatus,
}: StatusMenuDropdownProps) => {
  const statusColor = getStatusColor(currentStatus);
  const statusLabel = getStatusLabel(currentStatus);

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    // Prevent a click on the status button from propagating to parent elements,
    // switching to the step detail view.
    event.stopPropagation();
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {target ?? (
          <Button
            variant="light"
            color={statusColor}
            h={45}
            leftSection={
              <Box visibleFrom="md">
                <StatusIcon status={currentStatus} />
              </Box>
            }
            rightSection={
              <Box display="inline" visibleFrom="md">
                <Image
                  alt="Change"
                  src={ArrowDropdown}
                  height={24}
                  width={24}
                />
              </Box>
            }
            onClick={clickHandler}
          >
            <Box hiddenFrom="md">
              <StatusIcon status={currentStatus} />
            </Box>

            <Text c={"black"} size="sm" fw={500} visibleFrom="md">
              {statusLabel}
            </Text>
          </Button>
        )}
      </Menu.Target>
      <Menu.Dropdown>
        {Object.values(StatusEnum).map((status) => (
          <Menu.Item
            key={status}
            leftSection={
              <StatusIcon status={StatusEnum[status as StatusEnum]} />
            }
            onClick={(e) => {
              e.stopPropagation();
              onSelect(status);
            }}
          >
            <Text>{getStatusLabel(status)}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

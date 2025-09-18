import { ComponentProps, ReactNode, useCallback } from "react";
import { IconPlaylistAdd } from "@tabler/icons-react";
import {
  ActionIcon,
  ActionIconProps,
  Tooltip,
  TooltipProps,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { Modals } from "@/components/modals/modals.ts";
import { FormErrorMessages } from "@/lib/formErrors.ts";

type BulkAddButtonProps = ActionIconProps & {
  onBulkLoad?: (values: string[]) => void;
  icon?: ReactNode;
  iconProps?: ComponentProps<typeof IconPlaylistAdd>;
  tooltipProps?: Omit<TooltipProps, "children" | "label">;
  title?: string;
};

export const BulkAddButton = ({
  onBulkLoad,
  icon,
  iconProps = {},
  tooltipProps = {},
  title = "Bulk Add",
  ...actionIconProps
}: BulkAddButtonProps) => {
  const clickHandler = useCallback(() => {
    modals.openContextModal({
      modal: Modals.PromptModal,
      title,
      centered: true,
      size: "lg",
      innerProps: {
        multiline: true,
        inputProps: {
          placeholder: "Please insert one item per line",
          rows: 15,
        },
        validation: (value) => {
          if (value.length === 0) {
            return FormErrorMessages.required;
          }

          return undefined;
        },
        handleSubmit: (value) => {
          const splittedValue = value
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);

          if (onBulkLoad) {
            onBulkLoad(splittedValue);
          }
        },
      },
    });
  }, [onBulkLoad]);

  return (
    <Tooltip label={title} {...tooltipProps}>
      <ActionIcon
        variant="subtle"
        color="black"
        radius="xl"
        onClick={clickHandler}
        {...actionIconProps}
      >
        {icon ? icon : <IconPlaylistAdd size="18px" {...iconProps} />}
      </ActionIcon>
    </Tooltip>
  );
};

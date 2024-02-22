import {
  Box,
  Progress,
  type ProgressLabelProps,
  type ProgressRootProps,
  type ProgressSectionProps,
} from "@mantine/core";
import classes from "./competitionProgress.module.scss";

interface IProps {
  currentValue: number;
  totalValue: number;
  progressLabelProps?: ProgressLabelProps;
  progressSectionProps?: Omit<ProgressSectionProps, "value">;
  progressRootProps?: ProgressRootProps;
}

export const CompetitionProgress = ({
  currentValue,
  totalValue,
  progressLabelProps,
  progressSectionProps,
  progressRootProps,
}: IProps) => {
  const value = Math.floor((currentValue / totalValue) * 100);
  const isBorder = currentValue >= 0.98 * totalValue;

  return (
    <Box pt={16}>
      <Progress.Root radius="sm" className={classes.root} {...progressRootProps}>
        <Progress.Section
          value={value}
          className={`${classes.section} ${isBorder ? classes.border : undefined}`}
          {...progressSectionProps}
        >
          <Progress.Label className={classes.label} {...progressLabelProps}>
            {value}
            <span>%</span>
          </Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Box>
  );
};

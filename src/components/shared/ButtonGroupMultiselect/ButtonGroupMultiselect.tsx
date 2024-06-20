import { Button, MantineColor, MantineRadius, Text } from "@mantine/core";
import clsx from "clsx";
import { MouseEvent, ReactNode, useCallback } from "react";
import classes from "./ButtonGroupMultiselect.module.css";

export type TButtonGroupOption<Value = string | number> = {
  label: ReactNode;
  value: Value;
};

export type TButtonGroupMultiselect<Value> = {
  options: Array<TButtonGroupOption<Value>>;
  values: Array<Value>;
  onChange?: (
    values: Array<Value>,
    event: MouseEvent<HTMLButtonElement>,
  ) => void;
  showAllNone?: boolean;
  allLabel?: ReactNode;
  noneLabel?: ReactNode;
  activeColor?: MantineColor;
  inactiveColor?: MantineColor;
  radius?: MantineRadius;
};

export const ButtonGroupMultiselect = <T extends any>({
  options = [],
  values,
  onChange,
  showAllNone = true,
  allLabel,
  noneLabel,
  radius = "md",
}: TButtonGroupMultiselect<T>) => {
  const toggleSelectionHandler = useCallback(
    (option: TButtonGroupOption<T> | "ALL" | "NONE") =>
      (event: MouseEvent<HTMLButtonElement>) => {
        if (option === "ALL") {
          const allValues = options.map((option) => option.value);

          if (onChange) {
            onChange(allValues, event);
          }

          return;
        }

        if (option === "NONE") {
          if (onChange) {
            onChange([], event);
          }

          return;
        }

        const previousIndex = values.indexOf(option.value);
        const wasSelected = previousIndex >= 0;
        const newState = wasSelected
          ? values.filter((item) => item !== option.value)
          : values.concat(option.value);

        if (onChange) {
          onChange(newState, event);
        }
      },
    [onChange, options, values],
  );

  const isSelected = (value: T) => values.indexOf(value) >= 0;

  return (
    <Button.Group className={classes.root}>
      {showAllNone ? (
        <Button
          className={clsx(classes.button, classes.buttonInactive)}
          onClick={toggleSelectionHandler(
            values.length === options.length ? "NONE" : "ALL",
          )}
          radius={radius}
          miw={50}
        >
          {values.length === options.length ? (
            <Text span size="sm" fw="bold">
              {noneLabel ? noneLabel : "None"}
            </Text>
          ) : null}

          {values.length < options.length ? (
            <Text span size="sm" fw="bold">
              {allLabel ? allLabel : "All"}
            </Text>
          ) : null}
        </Button>
      ) : null}
      {options.map((option, index) => (
        <Button
          className={clsx(classes.button, {
            [classes.buttonActive]: isSelected(option.value),
            [classes.buttonInactive]: !isSelected(option.value),
          })}
          key={index}
          onClick={toggleSelectionHandler(option)}
          radius={radius}
        >
          {option.label}
        </Button>
      ))}
    </Button.Group>
  );
};

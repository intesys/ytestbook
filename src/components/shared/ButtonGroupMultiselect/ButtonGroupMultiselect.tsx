import { Button, Group, MantineColor, MantineRadius } from "@mantine/core";
import clsx from "clsx";
import { MouseEvent, ReactNode, useCallback, useState } from "react";
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
  const [selectedValues, setSelectedValues] = useState<Array<T>>(values);

  const toggleSelectionHandler = useCallback(
    (option: TButtonGroupOption<T> | "ALL" | "NONE") =>
      (event: MouseEvent<HTMLButtonElement>) => {
        if (option === "ALL") {
          const allValues = options.map((option) => option.value);
          setSelectedValues(allValues);
          if (onChange) {
            onChange(allValues, event);
          }
          return;
        }

        if (option === "NONE") {
          setSelectedValues([]);
          if (onChange) {
            onChange([], event);
          }
          return;
        }

        setSelectedValues((prevState) => {
          const previousIndex = prevState.indexOf(option.value);
          const wasSelected = previousIndex >= 0;
          const newState = wasSelected
            ? prevState.filter((item) => item !== option.value)
            : prevState.concat(option.value);

          if (onChange) {
            onChange(newState, event);
          }

          return newState;
        });
      },
    [],
  );

  const isSelected = (value: T) => values.indexOf(value) >= 0;

  return (
    <Group className={classes.root} gap={0} wrap="nowrap">
      {showAllNone && values.length === options.length ? (
        <Button
          className={clsx(classes.button, classes.buttonInactive)}
          onClick={toggleSelectionHandler("NONE")}
          radius={radius}
        >
          {noneLabel ? noneLabel : "None"}
        </Button>
      ) : null}
      {showAllNone && values.length < options.length ? (
        <Button
          className={clsx(classes.button, classes.buttonInactive)}
          onClick={toggleSelectionHandler("ALL")}
          radius={radius}
        >
          {allLabel ? allLabel : "All"}
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
    </Group>
  );
};

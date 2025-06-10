import { MouseEvent, useCallback } from "react";
import { StatusEnum } from "../../../../../../types/schema.ts";
import { ButtonGroupMultiselect } from "../../../../../shared/ButtonGroupMultiselect/ButtonGroupMultiselect.tsx";
import { StatusIcon } from "../../../../../statusIcon/StatusIcon.tsx";

export type TStatusFilterProps = {
  values: Array<StatusEnum>;
  onChange?: (
    values: StatusEnum[],
    event: MouseEvent<HTMLButtonElement>,
  ) => void;
};

export const StatusFilter = ({ values, onChange }: TStatusFilterProps) => {
  const changeHandler = useCallback(
    (values: StatusEnum[], event: MouseEvent<HTMLButtonElement>) => {
      if (onChange) {
        onChange(values, event);
      }
    },
    [onChange],
  );

  const statusList = [
    {
      label: <StatusIcon color={"currentColor"} status={StatusEnum.DONE} />,
      value: StatusEnum.DONE,
    },
    {
      label: <StatusIcon color={"currentColor"} status={StatusEnum.TODO} />,
      value: StatusEnum.TODO,
    },
    {
      label: <StatusIcon color={"currentColor"} status={StatusEnum.PENDING} />,
      value: StatusEnum.PENDING,
    },
    {
      label: <StatusIcon color={"currentColor"} status={StatusEnum.FAIL} />,
      value: StatusEnum.FAIL,
    },
    {
      label: <StatusIcon color={"currentColor"} status={StatusEnum.BLOCKED} />,
      value: StatusEnum.BLOCKED,
    },
    {
      label: (
        <StatusIcon color={"currentColor"} status={StatusEnum.CANCELLED} />
      ),
      value: StatusEnum.CANCELLED,
    },
    {
      label: <StatusIcon color={"currentColor"} status={StatusEnum.PAUSED} />,
      value: StatusEnum.PAUSED,
    },
  ];

  return (
    <>
      <ButtonGroupMultiselect<StatusEnum>
        values={values}
        onChange={changeHandler}
        options={statusList}
        showAllNone
        radius="md"
      />
    </>
  );
};

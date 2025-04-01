import { IconCaretDownFilled } from "@tabler/icons-react";
import { ComponentProps } from "react";

export type TSpinningCaretProps = ComponentProps<typeof IconCaretDownFilled> & {
  opened: boolean;
};

export const SpinningCaret = ({ opened, ...rest }: TSpinningCaretProps) => {
  return (
    <IconCaretDownFilled
      size={14}
      style={{
        color: "black",
        transition: "transform .2s",
        transform: opened ? "rotate(180deg)" : "rotate(0deg)",
      }}
      {...rest}
    />
  );
};

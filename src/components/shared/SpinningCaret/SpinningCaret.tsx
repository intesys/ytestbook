import { IconCaretDownFilled, TablerIconsProps } from "@tabler/icons-react";

export type TSpinningCaretProps = TablerIconsProps & {
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

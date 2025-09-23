import { Flex, FlexProps } from "@mantine/core";

/**
 * Renders a Mantine Flex as an inline-flex span.
 * @param {InlineFlexProps} props - Props to customize the Flex component.
 * @returns {JSX.Element} The rendered inline-flex container.
 */
export const InlineFlex = ({ children, ...flexProps }: FlexProps) => {
  const { style, ...rest } = flexProps;

  return (
    <Flex
      component="span"
      direction="row"
      align="center"
      gap={6}
      style={{ display: "inline-flex", ...style }}
      {...rest}
    >
      {children}
    </Flex>
  );
};

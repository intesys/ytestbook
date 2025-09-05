import { Flex, FlexProps } from "@mantine/core";

interface InlineFlexProps extends FlexProps {}

/**
 * Renders a Mantine Flex as an inline-flex span.
 * @param {InlineFlexProps} props - Props to customize the Flex component.
 * @returns {JSX.Element} The rendered inline-flex container.
 */
export const InlineFlex = ({ children, ...flexProps }: InlineFlexProps) => (
  <Flex
    component="span"
    direction="row"
    align="center"
    gap={6}
    style={{ display: "inline-flex", ...flexProps.style }}
    {...flexProps}
  >
    {children}
  </Flex>
);

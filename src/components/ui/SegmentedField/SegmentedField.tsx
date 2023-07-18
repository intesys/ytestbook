import { SegmentedControl } from "@mantine/core";
import { IProps } from "./types";

const SegmentedField: React.FC<IProps> = ({ data }) => {
  return (
    <SegmentedControl
      data={data}
      sx={{
        label: {
          lineHeight: 0,
        },
      }}
    />
  );
};

export default SegmentedField;
